/// <reference types="node" />
import { Transform } from 'stream';
import { Stream } from '../types';
declare type LoadableStreamCallback = (marks: string[]) => string;
export declare const createLoadableTransformer: (stream: Stream, callback: LoadableStreamCallback) => Transform;
export {};
