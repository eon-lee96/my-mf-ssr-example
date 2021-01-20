import { markMeta } from './metadata';
/**
 * loads chunk by a known chunkname
 * @param {String} chunkName
 */
export var loadByChunkname = function (chunkName) {
    return Promise.all(markMeta.filter(function (meta) { return meta.chunkName === chunkName; }).map(function (meta) { return meta.loadable.load(); }));
};
