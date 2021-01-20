import { lazy, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLoadable } from '../loadable/loadable';
import { useMark } from '../loadable/marks';
import { isItReady } from '../loadable/pending';
import { isBackend } from '../utils/detectBackend';
import { es6import } from '../utils/utils';
import { streamContext } from './context';
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
export function useLoadable(loadable, options) {
    if (options === void 0) { options = {}; }
    var UID = useContext(streamContext);
    var wasDone = loadable.done;
    var _a = useState({}), forceUpdate = _a[1];
    useMemo(function () {
        if (options.import !== false) {
            if (options.track !== false) {
                useMark(UID, loadable.mark);
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
    if (isBackend && !isItReady() && loadable.isLoading()) {
        /* tslint:disable:next-line no-console */
        console.error('react-imported-component: trying to render a component which is not ready. You should `await whenComponentsReady()`?');
    }
    // use mark
    // retry
    var retry = useCallback(function () {
        if (!loadable) {
            return;
        }
        loadable.reset();
        forceUpdate({});
        updateLoadable(loadable, forceUpdate);
    }, [loadable]);
    if (process.env.NODE_ENV !== 'production') {
        if (isBackend) {
            if (!loadable.done) {
                /* tslint:disable:next-line no-console */
                console.error('react-imported-component: using not resolved loadable. You should `await whenComponentsReady()`.');
            }
        }
    }
    return useMemo(function () { return ({
        loadable: loadable,
        retry: retry,
        update: forceUpdate,
    }); }, [loadable, retry, forceUpdate]);
}
export function useImported(importer, exportPicker, options) {
    if (exportPicker === void 0) { exportPicker = es6import; }
    if (options === void 0) { options = {}; }
    var topLoadable = getLoadable(importer);
    var _a = useLoadable(topLoadable, options), loadable = _a.loadable, retry = _a.retry;
    var error = loadable.error, done = loadable.done, payload = loadable.payload;
    var loading = loadable.isLoading();
    return useMemo(function () {
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
/**
 * A mix of React.lazy and useImported - uses React.lazy for Component and `useImported` to track the promise
 * not "retry"-able
 * @see if you need precise control consider {@link useImported}
 * @example
 *  const Component = useLazy(() => import('./MyComponent');
 *  return <Component /> // throws to SuspenseBoundary if not ready
 */
export function useLazy(importer) {
    var _a = useState(function () {
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
            lazyComponent: lazy(function () { return promise; }),
        };
        /* tslint:enable */
    })[0], resolve = _a.resolve, reject = _a.reject, lazyComponent = _a.lazyComponent;
    var _b = useImported(importer), error = _b.error, imported = _b.imported;
    useEffect(function () {
        if (error) {
            reject(error);
        }
        if (imported) {
            resolve(imported);
        }
    }, [error, imported]);
    return lazyComponent;
}
