export declare const addPending: (promise: Promise<any>) => number;
export declare const removeFromPending: (promise: Promise<any>) => Promise<any>[];
export declare const isItReady: () => boolean;
/**
 * waits for all necessary imports to be fulfilled
 */
export declare const done: () => Promise<void>;
