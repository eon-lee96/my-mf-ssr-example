"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var loadable_1 = require("../loadable/loadable");
var useImported_1 = require("./useImported");
/**
 * @deprecated use {@link useImported} instead
 */
function ImportedModule(props) {
    var _a = useImported_1.useImported(props.import), error = _a.error, loadable = _a.loadable, module = _a.imported;
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
exports.ImportedModule = ImportedModule;
/**
 * @deprecated use {@link useImported} instead
 */
function importedModule(loaderFunction) {
    var loadable = loadable_1.getLoadable(loaderFunction);
    var Module = (function (props) { return (React.createElement(ImportedModule, tslib_1.__assign({}, props, { import: loadable, fallback: props.fallback }))); });
    Module.preload = function () {
        loadable.load().catch(function () { return ({}); });
        return loadable.resolution;
    };
    Module.done = loadable.resolution;
    return Module;
}
exports.importedModule = importedModule;
