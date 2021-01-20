import { Loadable, Stream } from '../types';
export declare const useMark: (stream: Stream | undefined, marks: string[]) => void;
export declare const assignLoadableMark: (mark: string[], loadable: Loadable<any>) => void;
/**
 * returns marks used in the stream
 * @param stream
 */
export declare const getUsedMarks: (stream?: Stream) => string[];
/**
 * SSR
 * @returns list or marks used
 */
export declare const drainHydrateMarks: (stream?: Stream) => string[];
/**
 * Loads a given marks/chunks
 * @param marks
 * @returns a resolution promise
 */
export declare const rehydrateMarks: (marks?: string[] | undefined) => Promise<void>;
/**
 * waits for the given marks to load
 * @param marks
 */
export declare const waitForMarks: (marks: string[]) => Promise<any[]>;
/**
 * @returns a <script> tag with all used marks
 */
export declare const printDrainHydrateMarks: (stream?: Stream | undefined) => string;
