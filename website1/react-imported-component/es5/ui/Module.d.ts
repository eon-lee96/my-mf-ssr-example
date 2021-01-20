import { DefaultImport, FullImportModuleProps, HOCModuleType } from '../types';
/**
 * @deprecated use {@link useImported} instead
 */
export declare function ImportedModule<T>(props: FullImportModuleProps<T>): any;
/**
 * @deprecated use {@link useImported} instead
 */
export declare function importedModule<T>(loaderFunction: DefaultImport<T>): HOCModuleType<T>;
