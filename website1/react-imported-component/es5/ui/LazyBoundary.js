"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var detectBackend_1 = require("../utils/detectBackend");
var LazyBoundary = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
/**
 * React.Suspense "as-is" replacement
 */
var Boundary = detectBackend_1.isBackend ? LazyBoundary : React.Suspense;
exports.default = Boundary;
