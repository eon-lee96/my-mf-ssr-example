"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marks_1 = require("../loadable/marks");
exports.injectLoadableTracker = function (name) {
    if (name === void 0) { name = 'importedComponents'; }
    var value = global[name];
    if (value) {
        if (!value.push || (value.push && !value.forEach)) {
            // tslint:disable-next-line:no-console
            console.error('given: ', value);
            throw new Error("injectLoadableTracker(" + name + ") expected to be expected on Array-like variable, and only once.");
        }
        value.forEach(function (mark) { return marks_1.rehydrateMarks(mark); });
    }
    global[name] = {
        push: marks_1.rehydrateMarks,
    };
};
exports.getLoadableTrackerCallback = function (name) {
    if (name === void 0) { name = 'importedComponents'; }
    return function (marks) {
        return "<script>window." + name + "=window." + name + " || [];" + name + ".push(" + JSON.stringify(marks) + ");</script>";
    };
};
