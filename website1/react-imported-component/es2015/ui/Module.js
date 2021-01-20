import * as tslib_1 from "tslib";
import * as React from 'react';
import { getLoadable } from '../loadable/loadable';
import { useImported } from './useImported';
/**
 * @deprecated use {@link useImported} instead
 */
export function ImportedModule(props) {
    var _a = useImported(props.import), error = _a.error, loadable = _a.loadable, module = _a.imported;
    if (error) {
        throw error;
    }
    if (module) {
        return props.children(module);
    }
    if (!props.fallback) {
        throw loadable.resolution;
    }
    return props.fallback;
}
/**
 * @deprecated use {@link useImported} instead
 */
export function importedModule(loaderFunction) {
    var loadable = getLoadable(loaderFunction);
    var Module = (function (props) { return (React.createElement(ImportedModule, tslib_1.__assign({}, props, { import: loadable, fallback: props.fallback }))); });
    Module.preload = function () {
        loadable.load().catch(function () { return ({}); });
        return loadable.resolution;
    };
    Module.done = loadable.resolution;
    return Module;
}
