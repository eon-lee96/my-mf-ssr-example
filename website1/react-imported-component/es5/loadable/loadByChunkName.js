"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
/**
 * loads chunk by a known chunkname
 * @param {String} chunkName
 */
exports.loadByChunkname = function (chunkName) {
    return Promise.all(metadata_1.markMeta.filter(function (meta) { return meta.chunkName === chunkName; }).map(function (meta) { return meta.loadable.load(); }));
};
