import { ComponentType, LazyExoticComponent } from 'react';
import { DefaultComponentImport, DefaultImport, Loadable } from '../types';
interface ImportedShape<T> {
    imported?: T;
    error?: any;
    loading?: boolean;
    loadable: Loadable<any>;
    retry(): void;
}
interface HookOptions {
    import?: boolean;
    track?: boolean;
}
/**
 * react hook to wrap `import` with a tracker
 * used by {@link useImported}
 * @internal
 */
export declare function useLoadable<T>(loadable: Loadable<T>, options?: HookOptions): {
    loadable: Loadable<T>;
    retry: () => void;
    update: import("react").Dispatch<import("react").SetStateAction<{}>>;
};
/**
 * short version of {@link useImported}
 * @param {Function} importer - an function with `import` inside it
 *
 * @return {Object}
 *  - imported: if non empty - the data is loaded
 *  - error: if non empty - there is an error
 *  - loading: if true - then it's still loading
 *  - loadable: the under laying reference
 *  - retry: retry if case of failure
 *
 *  @example
 *  const { imported: Imported, loadable } = useImported(importer);
 *  if (Imported) {
 *    // yep, it's imported
 *    return <Imported {...children} />;
 *  }
 *  // else throw resolution
 *  throw loadable.resolution;
 */
export declare function useImported<T>(importer: DefaultImport<T> | Loadable<T>): ImportedShape<T>;
/**
 * The code splitting hook, the full version
 * @param {Function} importer - an function with `import` inside it
 * @param {Function} [exportPicker] - a "picker" of the export inside
 * @param {HookOptions} options
 * @param {Boolean} [options.import=true] - should the component be imported. Allow to defer execution.
 * @param {Boolean} [options.track=true] - allows disabling tracking of components, isolating them to SSR
 *
 * @return {Object}
 *  - imported: if non empty - the data is loaded
 *  - error: if non empty - there is an error
 *  - loading: if true - then it's still loading
 *  - loadable: the under laying reference
 *  - retry: retry if case of failure
 *
 * @see if you dont need precise control consider(and loading Components) {@link useLazy}
 *
 * @example
 *  const { imported: Imported, loadable } = useImported(importer, ({namedExport} => namedExport);
 * @example
 *  const { imported: Imported, loadable } = useImported(importer);
 *  if (Imported) {
 *    // yep, it's imported
 *    return <Imported {...children} />;
 *  }
 *  // else throw resolution
 *  throw loadable.resolution;
 */
export declare function useImported<T, K = T>(importer: DefaultImport<T> | Loadable<T>, exportPicker: undefined | ((x: T) => K), options?: HookOptions): ImportedShape<K>;
/**
 * A mix of React.lazy and useImported - uses React.lazy for Component and `useImported` to track the promise
 * not "retry"-able
 * @see if you need precise control consider {@link useImported}
 * @example
 *  const Component = useLazy(() => import('./MyComponent');
 *  return <Component /> // throws to SuspenseBoundary if not ready
 */
export declare function useLazy<T>(importer: DefaultComponentImport<T>): LazyExoticComponent<ComponentType<T>>;
export {};
