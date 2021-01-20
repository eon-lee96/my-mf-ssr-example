"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detectBackend_1 = require("../utils/detectBackend");
var rejectNetwork = function (url) { return url.indexOf('http') !== 0; };
var localSettings = {
    hot: (!!module).hot,
    SSR: detectBackend_1.isBackend,
    rethrowErrors: process.env.NODE_ENV !== 'production',
    fileFilter: rejectNetwork,
    checkSignatures: true,
};
exports.settings = {
    get hot() {
        return localSettings.hot;
    },
    get SSR() {
        return localSettings.SSR;
    },
    get rethrowErrors() {
        return localSettings.rethrowErrors;
    },
    get fileFilter() {
        return localSettings.fileFilter;
    },
    get checkSignatures() {
        return localSettings.checkSignatures;
    },
};
/**
 * allows fine tune imported logic
 * client side only!
 * @internal
 * @see configuration via imported.json {@link https://github.com/theKashey/react-imported-component#importedjs}
 */
exports.setConfiguration = function (config) {
    Object.assign(localSettings, config);
};
