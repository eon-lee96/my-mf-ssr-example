"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trimImport = function (str) { return str.replace(/['"]/g, ''); };
exports.importMatch = function (functionString) {
    var markMatches = functionString.match(/`imported_(.*?)_component`/g) || [];
    return markMatches.map(function (match) { return match && trimImport((match.match(/`imported_(.*?)_component`/i) || [])[1]); });
};
/**
 * the intention of this function is to "clear some (minification) noise from the function
 * basically from file to file different "short" names could be used
 * @param fn
 */
exports.getFunctionSignature = function (fn) {
    return String(fn)
        // quotes
        .replace(/(["'])/g, '`')
        // comments
        .replace(/\/\*([^\*]*)\*\//gi, '')
        // webpack specific
        .replace(/Promise.resolve\([^)]*\)/, '-we()')
        .replace(/\w+.e\([^)]*\)/, '-we()')
        .replace(/\w+.\w.bind\(/, '-wbind(')
        .replace(/\w+.bind\(/, '-wbind(')
        // prefix imported
        .replace(/([A-z0-9_]+)\(`imported_/g, '$(`imported_');
};
