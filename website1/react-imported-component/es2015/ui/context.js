import * as tslib_1 from "tslib";
import * as React from 'react';
import { defaultStream } from '../loadable/stream';
export var streamContext = React.createContext(defaultStream);
/**
 * SSR. Tracker for used marks
 */
export var ImportedStream = function (_a) {
    var stream = _a.stream, children = _a.children, props = tslib_1.__rest(_a, ["stream", "children"]);
    if (process.env.NODE_ENV !== 'development') {
        if ('takeUID' in props) {
            throw new Error('react-imported-component: `takeUID` was replaced by `stream`.');
        }
    }
    return React.createElement(streamContext.Provider, { value: stream }, children);
};
export var UIDConsumer = streamContext.Consumer;
