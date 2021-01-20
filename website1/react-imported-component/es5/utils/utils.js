"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asDefault(mayBeNotDefault) {
    if ('default' in mayBeNotDefault) {
        return mayBeNotDefault;
    }
    return {
        default: mayBeNotDefault,
    };
}
exports.asDefault = asDefault;
exports.es6import = function (module) { return (module.default ? module.default : module); };
