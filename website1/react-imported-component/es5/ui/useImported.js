"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var loadable_1 = require("../loadable/loadable");
var marks_1 = require("../loadable/marks");
var pending_1 = require("../loadable/pending");
var detectBackend_1 = require("../utils/detectBackend");
var utils_1 = require("../utils/utils");
var context_1 = require("./context");
function loadLoadable(loadable, callback) {
    var upd = function () { return callback({}); };
    loadable.loadIfNeeded().then(upd, upd);
}
function updateLoadable(loadable, callback) {
    // support HMR
    if (process.env.NODE_ENV === 'development') {
        var upd_1 = function () { return callback({}); };
        loadable._probeChanges().then(function (changed) { return changed && upd_1(); }, upd_1);
    }
}
/**
 * react hook to wrap `import` with a tracker
 * used by {@link useImported}
 * @internal
 */
function useLoadable(loadable, options) {
    if (options === void 0) { options = {}; }
    var UID = react_1.useContext(context_1.streamContext);
    var wasDone = loadable.done;
    var _a = react_1.useState({}), forceUpdate = _a[1];
    react_1.useMemo(function () {
        if (options.import !== false) {
            if (options.track !== false) {
                marks_1.useMark(UID, loadable.mark);
            }
            if (!wasDone) {
                loadLoadable(loadable, forceUpdate);
            }
            else {
                updateLoadable(loadable, forceUpdate);
            }
        }
        return true;
    }, [loadable, options.import, options.track]);
    if (detectBackend_1.isBackend && !pending_1.isItReady() && loadable.isLoading()) {
        /* tslint:disable:next-line no-console */
        console.error('react-imported-component: trying to render a component which is not ready. You should `await whenComponentsReady()`?');
    }
    // use mark
    // retry
    var retry = react_1.useCallback(function () {
        if (!loadable) {
            return;
        }
        loadable.reset();
        forceUpdate({});
        updateLoadable(loadable, forceUpdate);
    }, [loadable]);
    if (process.env.NODE_ENV !== 'production') {
        if (detectBackend_1.isBackend) {
            if (!loadable.done) {
                /* tslint:disable:next-line no-console */
                console.error('react-imported-component: using not resolved loadable. You should `await whenComponentsReady()`.');
            }
        }
    }
    return react_1.useMemo(function () { return ({
        loadable: loadable,
        retry: retry,
        update: forceUpdate,
    }); }, [loadable, retry, forceUpdate]);
}
exports.useLoadable = useLoadable;
function useImported(importer, exportPicker, options) {
    if (exportPicker === void 0) { exportPicker = utils_1.es6import; }
    if (options === void 0) { options = {}; }
    var topLoadable = loadable_1.getLoadable(importer);
    var _a = useLoadable(topLoadable, options), loadable = _a.loadable, retry = _a.retry;
    var error = loadable.error, done = loadable.done, payload = loadable.payload;
    var loading = loadable.isLoading();
    return react_1.useMemo(function () {
        if (error) {
            return {
                error: error,
                loadable: loadable,
                retry: retry,
            };
        }
        if (done) {
            return {
                imported: exportPicker(payload),
                loadable: loadable,
                retry: retry,
            };
        }
        return {
            loading: loading,
            loadable: loadable,
            retry: retry,
        };
    }, [error, loading, payload, loadable]);
}
exports.useImported = useImported;
/**
 * A mix of React.lazy and useImported - uses React.lazy for Component and `useImported` to track the promise
 * not "retry"-able
 * @see if you need precise control consider {@link useImported}
 * @example
 *  const Component = useLazy(() => import('./MyComponent');
 *  return <Component /> // throws to SuspenseBoundary if not ready
 */
function useLazy(importer) {
    var _a = react_1.useState(function () {
        /* tslint:disable no-shadowed-variable */
        var resolve;
        var reject;
        var promise = new Promise(function (rs, rej) {
            resolve = rs;
            reject = rej;
        });
        return {
            resolve: resolve,
            reject: reject,
            lazyComponent: react_1.lazy(function () { return promise; }),
        };
        /* tslint:enable */
    })[0], resolve = _a.resolve, reject = _a.reject, lazyComponent = _a.lazyComponent;
    var _b = useImported(importer), error = _b.error, imported = _b.imported;
    react_1.useEffect(function () {
        if (error) {
            reject(error);
        }
        if (imported) {
            resolve(imported);
        }
    }, [error, imported]);
    return lazyComponent;
}
exports.useLazy = useLazy;
