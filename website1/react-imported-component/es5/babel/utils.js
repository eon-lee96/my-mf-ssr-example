"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vm_1 = tslib_1.__importDefault(require("vm"));
var constants_1 = require("../configuration/constants");
var parseMagicComments = function (str) {
    if (str.trim() === constants_1.CLIENT_SIDE_ONLY) {
        return {};
    }
    try {
        var values = vm_1.default.runInNewContext("(function(){return {" + str + "};})()");
        return values;
    }
    catch (e) {
        return {};
    }
};
exports.commentsToConfiguration = function (comments) {
    return comments.reduce(function (acc, comment) { return (tslib_1.__assign({}, acc, parseMagicComments(comment))); }, {});
};
