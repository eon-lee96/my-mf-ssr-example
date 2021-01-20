"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var stream_1 = require("../loadable/stream");
exports.streamContext = React.createContext(stream_1.defaultStream);
/**
 * SSR. Tracker for used marks
 */
exports.ImportedStream = function (_a) {
    var stream = _a.stream, children = _a.children, props = tslib_1.__rest(_a, ["stream", "children"]);
    if (process.env.NODE_ENV !== 'development') {
        if ('takeUID' in props) {
            throw new Error('react-imported-component: `takeUID` was replaced by `stream`.');
        }
    }
    return React.createElement(exports.streamContext.Provider, { value: stream }, children);
};
exports.UIDConsumer = exports.streamContext.Consumer;
