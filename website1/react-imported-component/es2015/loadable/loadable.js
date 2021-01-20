import { getFunctionSignature, importMatch } from '../utils/signatures';
import { done } from './pending';
import { LOADABLE_SIGNATURE, LOADABLE_WEAK_SIGNATURE } from './registry';
import { toLoadable } from './toLoadable';
import { toKnownSignature } from './utils';
/**
 * try to perform a render and loads all chunks required for it
 * @deprecated
 */
export var dryRender = function (renderFunction) {
    renderFunction();
    return Promise.resolve().then(done);
};
export function executeLoadable(importFunction) {
    if ('resolution' in importFunction) {
        return importFunction.reload();
    }
    else {
        return importFunction();
    }
}
/**
 * wraps an `import` function with a tracker
 * @internal
 * @param importFunction
 */
export function getLoadable(importFunction) {
    if ('resolution' in importFunction) {
        return importFunction;
    }
    if (LOADABLE_WEAK_SIGNATURE.has(importFunction)) {
        return LOADABLE_WEAK_SIGNATURE.get(importFunction);
    }
    var rawSignature = getFunctionSignature(importFunction);
    var ownMark = importMatch(String(rawSignature));
    // read cache signature
    var functionSignature = toKnownSignature(rawSignature, ownMark);
    if (LOADABLE_SIGNATURE.has(functionSignature)) {
        // tslint:disable-next-line:no-shadowed-variable
        var loadable_1 = LOADABLE_SIGNATURE.get(functionSignature);
        loadable_1.replaceImportFunction(importFunction);
        return loadable_1;
    }
    if (ownMark) {
        LOADABLE_SIGNATURE.forEach(function (_a) {
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
    var loadable = toLoadable(importFunction);
    LOADABLE_WEAK_SIGNATURE.set(importFunction, loadable);
    return loadable;
}
/**
 * Reset `importers` weak cache
 * @internal
 */
export var clearImportedCache = function () { return LOADABLE_SIGNATURE.clear(); };
