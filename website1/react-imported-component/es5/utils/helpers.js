"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * helper function to remap imports
 * @param x
 * @param map
 */
function remapImports(x, map) {
    return x.then(map);
}
exports.remapImports = remapImports;
