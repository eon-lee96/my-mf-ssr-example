"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var utils_1 = require("./utils");
var getMarkedMeta = function (marks, mapping) {
    if (metadata_1.markMeta.length === 0) {
        throw new Error('react-imported-component: no import meta-information found. Have you imported async-requires?');
    }
    return Array.from(new Set(metadata_1.markMeta
        .filter(function (meta) { return utils_1.markerOverlap(meta.mark, marks); })
        .map(mapping)
        .filter(Boolean)).values());
};
exports.getMarkedChunks = function (marks) { return getMarkedMeta(marks, function (meta) { return meta.chunkName; }); };
exports.getMarkedFileNames = function (marks) { return getMarkedMeta(marks, function (meta) { return meta.fileName; }); };
