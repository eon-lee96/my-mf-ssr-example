"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoadableStream = function () { return ({ marks: {} }); };
exports.clearStream = function (stream) {
    if (stream) {
        stream.marks = {};
    }
};
exports.checkStream = function (stream) {
    if (process.env.NODE_ENV !== 'production') {
        if (!stream) {
            return;
        }
        if (typeof stream !== 'object' || !stream.marks) {
            throw new Error('react-imported-component: version 6 requires `stream` to be an object. Refer to the migration guide');
        }
    }
};
exports.defaultStream = exports.createLoadableStream();
