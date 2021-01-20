import { Default } from '../types';
declare type ObjectOrFunction = object | (() => any);
export declare function asDefault<T extends ObjectOrFunction>(mayBeNotDefault: T | Default<T>): Default<T>;
export declare const es6import: (module: any) => any;
export {};
