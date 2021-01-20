"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var marks_1 = require("../loadable/marks");
exports.createLoadableTransformer = function (stream, callback) {
    var usedMarks = new Set();
    return new stream_1.Transform({
        // transform() is called with each chunk of data
        // tslint:disable-next-line:variable-name
        transform: function (chunk, _, _callback) {
            var marks = marks_1.getUsedMarks(stream);
            var newMarks = [];
            marks.forEach(function (mark) {
                if (!usedMarks.has(mark)) {
                    newMarks.push(mark);
                    usedMarks.add(mark);
                }
            });
            var chunkData = Buffer.from(chunk, 'utf-8');
            _callback(undefined, callback(newMarks) + chunkData);
        },
    });
};
