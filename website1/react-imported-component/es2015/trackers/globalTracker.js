import { rehydrateMarks } from '../loadable/marks';
export var injectLoadableTracker = function (name) {
    if (name === void 0) { name = 'importedComponents'; }
    var value = global[name];
    if (value) {
        if (!value.push || (value.push && !value.forEach)) {
            // tslint:disable-next-line:no-console
            console.error('given: ', value);
            throw new Error("injectLoadableTracker(" + name + ") expected to be expected on Array-like variable, and only once.");
        }
        value.forEach(function (mark) { return rehydrateMarks(mark); });
    }
    global[name] = {
        push: rehydrateMarks,
    };
};
export var getLoadableTrackerCallback = function (name) {
    if (name === void 0) { name = 'importedComponents'; }
    return function (marks) {
        return "<script>window." + name + "=window." + name + " || [];" + name + ".push(" + JSON.stringify(marks) + ");</script>";
    };
};
