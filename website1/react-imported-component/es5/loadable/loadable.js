"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signatures_1 = require("../utils/signatures");
var pending_1 = require("./pending");
var registry_1 = require("./registry");
var toLoadable_1 = require("./toLoadable");
var utils_1 = require("./utils");
/**
 * try to perform a render and loads all chunks required for it
 * @deprecated
 */
exports.dryRender = function (renderFunction) {
    renderFunction();
    return Promise.resolve().then(pending_1.done);
};
function executeLoadable(importFunction) {
    if ('resolution' in importFunction) {
        return importFunction.reload();
    }
    else {
        return importFunction();
    }
}
exports.executeLoadable = executeLoadable;
/**
 * wraps an `import` function with a tracker
 * @internal
 * @param importFunction
 */
function getLoadable(importFunction) {
    if ('resolution' in importFunction) {
        return importFunction;
    }
    if (registry_1.LOADABLE_WEAK_SIGNATURE.has(importFunction)) {
        return registry_1.LOADABLE_WEAK_SIGNATURE.get(importFunction);
    }
    var rawSignature = signatures_1.getFunctionSignature(importFunction);
    var ownMark = signatures_1.importMatch(String(rawSignature));
    // read cache signature
    var functionSignature = utils_1.toKnownSignature(rawSignature, ownMark);
    if (registry_1.LOADABLE_SIGNATURE.has(functionSignature)) {
        // tslint:disable-next-line:no-shadowed-variable
        var loadable_1 = registry_1.LOADABLE_SIGNATURE.get(functionSignature);
        loadable_1.replaceImportFunction(importFunction);
        return loadable_1;
    }
    if (ownMark) {
        registry_1.LOADABLE_SIGNATURE.forEach(function (_a) {
            var mark = _a.mark, importer = _a.importer;
            if (mark[0] === ownMark[1] && mark.join('|') === ownMark.join('|')) {
                // tslint:disable-next-line:no-console
                console.warn('Another loadable found for an existing mark. That\'s possible, but signatures must match (https://github.com/theKashey/react-imported-component/issues/192):', {
                    mark: mark,
                    knownImporter: importer,
                    currentImported: importFunction,
                    currentSignature: String(importFunction),
                    knownSignature: String(importer),
                });
            }
        });
    }
    var loadable = toLoadable_1.toLoadable(importFunction);
    registry_1.LOADABLE_WEAK_SIGNATURE.set(importFunction, loadable);
    return loadable;
}
exports.getLoadable = getLoadable;
/**
 * Reset `importers` weak cache
 * @internal
 */
exports.clearImportedCache = function () { return registry_1.LOADABLE_SIGNATURE.clear(); };
