export declare type Preloader = () => any;
/**
 * adds a precondition before resolving any imported object
 */
export declare const addPreloader: (preloader: Preloader) => () => void;
export declare const getPreloaders: () => any[];
