export var markMeta = [];
export var assignMetaData = function (mark, loadable, chunkName, fileName) {
    markMeta.push({ mark: mark, loadable: loadable, chunkName: chunkName, fileName: fileName });
};
