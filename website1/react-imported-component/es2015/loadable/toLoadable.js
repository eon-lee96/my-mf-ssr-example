import { isBackend } from '../utils/detectBackend';
import { getFunctionSignature, importMatch } from '../utils/signatures';
import { assignLoadableMark } from './marks';
import { addPending, removeFromPending } from './pending';
import { getPreloaders } from './preloaders';
import { LOADABLE_SIGNATURE } from './registry';
import { toKnownSignature } from './utils';
export function toLoadable(firstImportFunction, autoImport) {
    if (autoImport === void 0) { autoImport = true; }
    var importFunction = firstImportFunction;
    var loadImportedComponent = function () {
        return Promise.all([importFunction()].concat(getPreloaders())).then(function (_a) {
            var result = _a[0];
            return result;
        });
    };
    var functionSignature = getFunctionSignature(importFunction);
    var mark = importMatch(functionSignature);
    var resolveResolution;
    var resolution = new Promise(function (r) {
        resolveResolution = r;
    });
    var loadable = {
        // importFunction,
        mark: mark,
        resolution: resolution,
        done: false,
        ok: false,
        error: null,
        payload: undefined,
        promise: undefined,
        isLoading: function () {
            return !!this.promise && !this.done;
        },
        reset: function () {
            this.done = false;
            this.ok = true;
            this.payload = undefined;
            this.promise = undefined;
        },
        replaceImportFunction: function (newImportFunction) {
            importFunction = newImportFunction;
        },
        get importer() {
            return importFunction;
        },
        then: function (cb, err) {
            if (this.promise) {
                return this.promise.then(cb, err);
            }
            if (err) {
                err();
            }
            return Promise.reject();
        },
        loadIfNeeded: function () {
            if (this.error) {
                this.reset();
            }
            if (!this.promise) {
                this.load();
            }
            return this.promise;
        },
        tryResolveSync: function (then) {
            if (this.done) {
                var result_1 = then(this.payload);
                return {
                    then: function (cb) {
                        // synchronous thenable - https://github.com/facebook/react/pull/14626
                        cb(result_1);
                        return Promise.resolve(result_1);
                    },
                };
            }
            return this.loadIfNeeded().then(then);
        },
        reload: function () {
            if (this.promise) {
                this.promise = undefined;
                return this.load();
            }
            return Promise.resolve();
        },
        _probeChanges: function () {
            var _this = this;
            return Promise.resolve(importFunction())
                .then(function (payload) { return payload !== _this.payload; })
                .catch(function (err) {
                throw err;
            });
        },
        load: function () {
            var _this = this;
            if (!this.promise) {
                var promise_1 = (this.promise = loadImportedComponent().then(function (payload) {
                    _this.done = true;
                    _this.ok = true;
                    _this.payload = payload;
                    _this.error = null;
                    removeFromPending(promise_1);
                    resolveResolution(payload);
                    return payload;
                }, function (err) {
                    _this.done = true;
                    _this.ok = false;
                    _this.error = err;
                    removeFromPending(promise_1);
                    throw err;
                }));
                addPending(promise_1);
            }
            return this.promise;
        },
    };
    if (mark && mark.length) {
        LOADABLE_SIGNATURE.set(toKnownSignature(functionSignature, mark), loadable);
        assignLoadableMark(mark, loadable);
    }
    else {
        if (process.env.NODE_ENV !== 'development') {
            // tslint:disable-next-line:no-console
            console.warn('react-imported-component: no mark found at', importFunction, 'Please check babel plugin or macro setup, as well as imported-component\'s limitations. See https://github.com/theKashey/react-imported-component/issues/147');
        }
    }
    // trigger preload on the server side
    if (isBackend && autoImport) {
        loadable.load();
    }
    return loadable;
}
