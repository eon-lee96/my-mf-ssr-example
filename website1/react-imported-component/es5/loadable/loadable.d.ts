import { DefaultImport, Loadable } from '../types';
/**
 * try to perform a render and loads all chunks required for it
 * @deprecated
 */
export declare const dryRender: (renderFunction: () => void) => Promise<void>;
export declare function executeLoadable(importFunction: DefaultImport<any> | Loadable<any>): Promise<any>;
/**
 * wraps an `import` function with a tracker
 * @internal
 * @param importFunction
 */
export declare function getLoadable<T>(importFunction: DefaultImport<T> | Loadable<T>): Loadable<T>;
/**
 * Reset `importers` weak cache
 * @internal
 */
export declare const clearImportedCache: () => void;
