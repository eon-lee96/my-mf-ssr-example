import * as tslib_1 from "tslib";
import * as React from 'react';
import { useMemo } from 'react';
import { getLoadable } from '../loadable/loadable';
import { isBackend } from '../utils/detectBackend';
import { asDefault } from '../utils/utils';
import { ImportedComponent } from './Component';
import { useLoadable } from './useImported';
/**
 * creates a "lazy" component, like `React.lazy`
 * @see {@link useImported} or {@link useLazy}
 * @param {Function} loaderFunction - () => import('a'), or () => require('b')
 * @param {Object} [options]
 * @param {React.Component} [options.LoadingComponent]
 * @param {React.Component} [options.ErrorComponent]
 * @param {Function} [options.onError] - error handler. Will consume the real error.
 * @param {Function} [options.async = false] - enable React 16+ suspense.
 *
 * @example
 * const PageA = imported('./pageA', { async: true });
 */
function loader(loaderFunction, baseOptions) {
    if (baseOptions === void 0) { baseOptions = {}; }
    var loadable = getLoadable(loaderFunction);
    var Imported = React.forwardRef(function ImportedComponentHOC(_a, ref) {
        var _b = _a.importedProps, importedProps = _b === void 0 ? {} : _b, props = tslib_1.__rest(_a, ["importedProps"]);
        var options = tslib_1.__assign({}, baseOptions, importedProps);
        return (React.createElement(ImportedComponent, { loadable: loadable, LoadingComponent: options.LoadingComponent, ErrorComponent: options.ErrorComponent, onError: options.onError, render: options.render, async: options.async, forwardProps: props || {}, forwardRef: ref }));
    });
    Imported.preload = function () {
        loadable.load().catch(function () { return ({}); });
        return loadable.resolution;
    };
    Imported.done = loadable.resolution;
    return Imported;
}
var ReactLazy = React.lazy;
/**
 * React.lazy "as-is" replacement
 */
export function lazy(importer) {
    if (isBackend) {
        return loader(importer);
    }
    if (process.env.NODE_ENV !== 'production') {
        // lazy is not hot-reloadable
        if (module.hot) {
            return loader(importer, { async: true });
        }
    }
    var topLoadable = getLoadable(importer);
    return function ImportedLazy(props) {
        var loadable = useLoadable(topLoadable).loadable;
        var Lazy = useMemo(function () { return ReactLazy(function () { return loadable.tryResolveSync(asDefault); }); }, []);
        return React.createElement(Lazy, tslib_1.__assign({}, props));
    };
}
export default loader;
