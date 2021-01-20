import { readFile, writeFile } from 'fs';
import { relative, sep } from 'path';
import { promisify } from 'util';
export var normalizePath = function (path) { return path.split(sep).join('/'); };
export var getRelative = function (from, to) {
    // force one unit paths
    var rel = normalizePath(relative(from, to));
    return rel[0] !== '.' ? './' + rel : rel;
};
export var getMatchString = function (pattern, selected) { return function (str) {
    return (str.match(new RegExp(pattern, 'g')) || []).map(function (statement) { return (statement.match(new RegExp(pattern, 'i')) || [])[selected]; });
}; };
export var pReadFile = promisify(readFile);
export var pWriteFile = promisify(writeFile);
export var getFileContent = function (file) { return pReadFile(file, 'utf8'); };
