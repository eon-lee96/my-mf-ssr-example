import { checkStream, clearStream, defaultStream } from './stream';
import { markerOverlap } from './utils';
var LOADABLE_MARKS = new Map();
export var useMark = function (stream, marks) {
    if (stream === void 0) { stream = defaultStream; }
    checkStream(stream);
    if (marks && marks.length) {
        marks.forEach(function (a) { return (stream.marks[a] = true); });
    }
};
export var assignLoadableMark = function (mark, loadable) {
    LOADABLE_MARKS.set(JSON.stringify(mark), { mark: mark, loadable: loadable });
};
/**
 * returns marks used in the stream
 * @param stream
 */
export var getUsedMarks = function (stream) {
    if (stream === void 0) { stream = defaultStream; }
    return (stream ? Object.keys(stream.marks) : []);
};
/**
 * SSR
 * @returns list or marks used
 */
export var drainHydrateMarks = function (stream) {
    if (stream === void 0) { stream = defaultStream; }
    checkStream(stream);
    var marks = getUsedMarks(stream);
    clearStream(stream);
    return marks;
};
/**
 * Loads a given marks/chunks
 * @param marks
 * @returns a resolution promise
 */
export var rehydrateMarks = function (marks) {
    var rehydratedMarks = marks || global.___REACT_DEFERRED_COMPONENT_MARKS || [];
    var tasks = [];
    var usedMarks = new Set();
    var createTask = function (_a) {
        var mark = _a.mark, loadable = _a.loadable;
        if (markerOverlap(mark, rehydratedMarks)) {
            mark.forEach(function (m) { return usedMarks.add(m); });
            tasks.push(loadable.load());
        }
    };
    LOADABLE_MARKS.forEach(createTask);
    var lastLoadableMarksKey = Array.from(LOADABLE_MARKS.keys());
    var handleNestedMarks = function () {
        var nextLoadableMarksKey = Array.from(LOADABLE_MARKS.keys());
        if (lastLoadableMarksKey.length === nextLoadableMarksKey.length) {
            return Promise.resolve();
        }
        var newMarks = nextLoadableMarksKey.slice(lastLoadableMarksKey.length - nextLoadableMarksKey.length);
        newMarks
            .map(function (k) {
            return LOADABLE_MARKS.get(k);
        })
            .forEach(createTask);
        lastLoadableMarksKey = nextLoadableMarksKey;
        return Promise.all(tasks).then(handleNestedMarks);
    };
    return Promise.all(tasks)
        .then(handleNestedMarks)
        .then(function () {
        rehydratedMarks.forEach(function (m) {
            if (!usedMarks.has(m)) {
                throw new Error("react-imported-component: unknown mark(" + m + ") has been used. Client and Server should have the same babel configuration.");
            }
        });
    });
};
/**
 * waits for the given marks to load
 * @param marks
 */
export var waitForMarks = function (marks) {
    var tasks = [];
    LOADABLE_MARKS.forEach(function (_a) {
        var mark = _a.mark, loadable = _a.loadable;
        if (markerOverlap(mark, marks)) {
            tasks.push(loadable.resolution);
        }
    });
    return Promise.all(tasks);
};
/**
 * @returns a <script> tag with all used marks
 */
export var printDrainHydrateMarks = function (stream) {
    checkStream(stream);
    return "<script>window.___REACT_DEFERRED_COMPONENT_MARKS=" + JSON.stringify(drainHydrateMarks(stream)) + ";</script>";
};
