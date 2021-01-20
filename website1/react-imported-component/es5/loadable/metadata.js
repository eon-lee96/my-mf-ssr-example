"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markMeta = [];
exports.assignMetaData = function (mark, loadable, chunkName, fileName) {
    exports.markMeta.push({ mark: mark, loadable: loadable, chunkName: chunkName, fileName: fileName });
};
