var preloaders = [];
/**
 * adds a precondition before resolving any imported object
 */
export var addPreloader = function (preloader) {
    preloaders.push(preloader);
    return function () {
        preloaders = preloaders.filter(function (p) { return p !== preloader; });
    };
};
export var getPreloaders = function () { return preloaders.map(function (preloader) { return preloader(); }); };
