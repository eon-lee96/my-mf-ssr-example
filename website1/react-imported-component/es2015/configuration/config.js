import { isBackend } from '../utils/detectBackend';
var rejectNetwork = function (url) { return url.indexOf('http') !== 0; };
var localSettings = {
    hot: (!!module).hot,
    SSR: isBackend,
    rethrowErrors: process.env.NODE_ENV !== 'production',
    fileFilter: rejectNetwork,
    checkSignatures: true,
};
export var settings = {
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
export var setConfiguration = function (config) {
    Object.assign(localSettings, config);
};
