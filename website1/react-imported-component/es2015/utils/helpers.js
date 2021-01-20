/**
 * helper function to remap imports
 * @param x
 * @param map
 */
export function remapImports(x, map) {
    return x.then(map);
}
