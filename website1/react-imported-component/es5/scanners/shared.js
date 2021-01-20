"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var util_1 = require("util");
exports.normalizePath = function (path) { return path.split(path_1.sep).join('/'); };
exports.getRelative = function (from, to) {
    // force one unit paths
    var rel = exports.normalizePath(path_1.relative(from, to));
    return rel[0] !== '.' ? './' + rel : rel;
};
exports.getMatchString = function (pattern, selected) { return function (str) {
    return (str.match(new RegExp(pattern, 'g')) || []).map(function (statement) { return (statement.match(new RegExp(pattern, 'i')) || [])[selected]; });
}; };
exports.pReadFile = util_1.promisify(fs_1.readFile);
exports.pWriteFile = util_1.promisify(fs_1.writeFile);
exports.getFileContent = function (file) { return exports.pReadFile(file, 'utf8'); };
