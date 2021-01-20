import { commentsToConfiguration } from './utils';
var preservePrefetch = function (_, __, options) { return !!options.webpackPrefetch; };
var preservePreload = function (_, __, options) { return !!options.webpackPreload; };
var preserveChunkName = function (_, __, options) {
    return options.webpackChunkName || options.chunkName;
};
var chunkComment = function (chunk) { return "webpackChunkName: \"" + chunk + "\""; };
var preloadComment = function () { return "webpackPreload: true"; };
var prefetchComment = function () { return "webpackPrefetch: true"; };
var knownMagics = ['webpackChunkName', 'webpackPrefetch', 'webpackPreload'];
var toComments = function (conf) {
    return Object.keys(conf)
        .filter(function (key) { return !knownMagics.includes(key); })
        .reduce(function (acc, key) { return acc.concat([key + ":" + JSON.stringify(conf[key])]); }, []);
};
var nullish = function (a, b) {
    if (a === undefined) {
        return b;
    }
    return a;
};
export var processComment = function (configuration, comments, importName, fileName, options) {
    var _a = configuration.shouldPrefetch, shouldPrefetch = _a === void 0 ? preservePrefetch : _a, _b = configuration.shouldPreload, shouldPreload = _b === void 0 ? preservePreload : _b, _c = configuration.chunkName, chunkName = _c === void 0 ? preserveChunkName : _c;
    var importConfiguration = commentsToConfiguration(comments);
    var newChunkName = nullish(chunkName(importName, fileName, importConfiguration), preserveChunkName(importName, fileName, importConfiguration));
    var isBootstrapFile = options.isBootstrapFile;
    return toComments(importConfiguration).concat([
        !isBootstrapFile && shouldPrefetch(importName, fileName, importConfiguration) ? prefetchComment() : '',
        !isBootstrapFile && shouldPreload(importName, fileName, importConfiguration) ? preloadComment() : '',
        newChunkName ? chunkComment(newChunkName) : '',
    ]).filter(function (x) { return !!x; });
};
