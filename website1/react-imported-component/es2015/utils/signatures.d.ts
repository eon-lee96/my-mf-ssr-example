import { AnyFunction } from '../types';
export declare const importMatch: (functionString: string) => string[];
/**
 * the intention of this function is to "clear some (minification) noise from the function
 * basically from file to file different "short" names could be used
 * @param fn
 */
export declare const getFunctionSignature: (fn: string | AnyFunction) => string;
