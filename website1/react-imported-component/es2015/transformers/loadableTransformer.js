import { Transform } from 'stream';
import { getUsedMarks } from '../loadable/marks';
export var createLoadableTransformer = function (stream, callback) {
    var usedMarks = new Set();
    return new Transform({
        // transform() is called with each chunk of data
        // tslint:disable-next-line:variable-name
        transform: function (chunk, _, _callback) {
            var marks = getUsedMarks(stream);
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
