import { Stream } from '../types';
export declare const createLoadableStream: () => {
    marks: {};
};
export declare const clearStream: (stream?: Stream | undefined) => void;
export declare const checkStream: (stream: string | number | Stream | undefined) => void;
export declare const defaultStream: {
    marks: {};
};
