export var createLoadableStream = function () { return ({ marks: {} }); };
export var clearStream = function (stream) {
    if (stream) {
        stream.marks = {};
    }
};
export var checkStream = function (stream) {
    if (process.env.NODE_ENV !== 'production') {
        if (!stream) {
            return;
        }
        if (typeof stream !== 'object' || !stream.marks) {
            throw new Error('react-imported-component: version 6 requires `stream` to be an object. Refer to the migration guide');
        }
    }
};
export var defaultStream = createLoadableStream();
