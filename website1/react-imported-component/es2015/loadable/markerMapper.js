import { markMeta } from './metadata';
import { markerOverlap } from './utils';
var getMarkedMeta = function (marks, mapping) {
    if (markMeta.length === 0) {
        throw new Error('react-imported-component: no import meta-information found. Have you imported async-requires?');
    }
    return Array.from(new Set(markMeta
        .filter(function (meta) { return markerOverlap(meta.mark, marks); })
        .map(mapping)
        .filter(Boolean)).values());
};
export var getMarkedChunks = function (marks) { return getMarkedMeta(marks, function (meta) { return meta.chunkName; }); };
export var getMarkedFileNames = function (marks) { return getMarkedMeta(marks, function (meta) { return meta.fileName; }); };
