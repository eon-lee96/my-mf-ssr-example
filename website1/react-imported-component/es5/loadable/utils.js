"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../configuration/config");
exports.toKnownSignature = function (signature, marks) {
    return (!config_1.settings.checkSignatures && marks.join('|')) || signature;
};
exports.markerOverlap = function (a1, a2) {
    return a1.filter(function (mark) { return a2.indexOf(mark) >= 0; }).length === a1.length;
};
