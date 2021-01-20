import { Loadable, Promised } from '../types';
export interface InnerLoadable<T> extends Loadable<T> {
    ok: boolean;
    promise: Promise<T> | undefined;
    _probeChanges(): Promise<boolean>;
}
export declare function toLoadable<T>(firstImportFunction: Promised<T>, autoImport?: boolean): Loadable<T>;
