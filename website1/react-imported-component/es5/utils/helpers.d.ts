/**
 * helper function to remap imports
 * @param x
 * @param map
 */
export declare function remapImports<T, Y>(x: Promise<T>, map: (a: T) => Y): Promise<Y>;
