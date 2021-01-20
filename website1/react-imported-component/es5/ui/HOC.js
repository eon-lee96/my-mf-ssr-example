"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var loadable_1 = require("../loadable/loadable");
var detectBackend_1 = require("../utils/detectBackend");
var utils_1 = require("../utils/utils");
var Component_1 = require("./Component");
var useImported_1 = require("./useImported");
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
    var loadable = loadable_1.getLoadable(loaderFunction);
    var Imported = React.forwardRef(function ImportedComponentHOC(_a, ref) {
        var _b = _a.importedProps, importedProps = _b === void 0 ? {} : _b, props = tslib_1.__rest(_a, ["importedProps"]);
        var options = tslib_1.__assign({}, baseOptions, importedProps);
        return (React.createElement(Component_1.ImportedComponent, { loadable: loadable, LoadingComponent: options.LoadingComponent, ErrorComponent: options.ErrorComponent, onError: options.onError, render: options.render, async: options.async, forwardProps: props || {}, forwardRef: ref }));
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
function lazy(importer) {
    if (detectBackend_1.isBackend) {
        return loader(importer);
    }
    if (process.env.NODE_ENV !== 'production') {
        // lazy is not hot-reloadable
        if (module.hot) {
            return loader(importer, { async: true });
        }
    }
    var topLoadable = loadable_1.getLoadable(importer);
    return function ImportedLazy(props) {
        var loadable = useImported_1.useLoadable(topLoadable).loadable;
        var Lazy = react_1.useMemo(function () { return ReactLazy(function () { return loadable.tryResolveSync(utils_1.asDefault); }); }, []);
        return React.createElement(Lazy, tslib_1.__assign({}, props));
    };
}
exports.lazy = lazy;
exports.default = loader;
