import * as React from 'react';
import { Stream } from '../types';
interface TakeProps {
    stream: Stream;
}
export declare const streamContext: React.Context<{
    marks: {};
}>;
/**
 * SSR. Tracker for used marks
 */
export declare const ImportedStream: React.FC<TakeProps>;
export declare const UIDConsumer: React.ExoticComponent<React.ConsumerProps<{
    marks: {};
}>>;
export {};
