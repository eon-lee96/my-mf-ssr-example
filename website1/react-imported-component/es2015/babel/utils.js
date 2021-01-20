import * as tslib_1 from "tslib";
import vm from 'vm';
import { CLIENT_SIDE_ONLY } from '../configuration/constants';
var parseMagicComments = function (str) {
    if (str.trim() === CLIENT_SIDE_ONLY) {
        return {};
    }
    try {
        var values = vm.runInNewContext("(function(){return {" + str + "};})()");
        return values;
    }
    catch (e) {
        return {};
    }
};
export var commentsToConfiguration = function (comments) {
    return comments.reduce(function (acc, comment) { return (tslib_1.__assign({}, acc, parseMagicComments(comment))); }, {});
};
