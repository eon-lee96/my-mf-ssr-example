"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preloaders = [];
/**
 * adds a precondition before resolving any imported object
 */
exports.addPreloader = function (preloader) {
    preloaders.push(preloader);
    return function () {
        preloaders = preloaders.filter(function (p) { return p !== preloader; });
    };
};
exports.getPreloaders = function () { return preloaders.map(function (preloader) { return preloader(); }); };
