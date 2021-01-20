export function asDefault(mayBeNotDefault) {
    if ('default' in mayBeNotDefault) {
        return mayBeNotDefault;
    }
    return {
        default: mayBeNotDefault,
    };
}
export var es6import = function (module) { return (module.default ? module.default : module); };
