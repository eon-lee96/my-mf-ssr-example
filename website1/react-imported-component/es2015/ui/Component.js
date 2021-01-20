import * as tslib_1 from "tslib";
import * as React from 'react';
import { settings } from '../configuration/config';
import { useImported } from './useImported';
/**
 * @deprecated use {@link useImported} instead
 */
function ImportedComponent(props) {
    var _a = useImported(props.loadable), loading = _a.loading, error = _a.error, loadable = _a.loadable, Component = _a.imported, retry = _a.retry;
    if (loading && props.async) {
        throw loadable.resolution;
    }
    if ('render' in props && props.render) {
        return props.render(Component, { loading: loading, error: error }, props.forwardProps);
    }
    if (Component) {
        // importedUUID for cache busting
        // @ts-ignore
        return React.createElement(Component, tslib_1.__assign({}, props.forwardProps, { ref: props.forwardRef }));
    }
    if (loading) {
        if (props.async) {
            throw loadable.resolution;
        }
        return props.LoadingComponent ? React.createElement(props.LoadingComponent, tslib_1.__assign({}, props.forwardProps)) : null;
    }
    if (error) {
        // always report errors
        // tslint:disable-next-line:no-console
        console.error('react-imported-component', error);
        // let's rethrow the error after react leaves this function
        // this might be very crucial for the "safe" dev mode
        if (settings.rethrowErrors) {
            setTimeout(function () {
                throw error;
            });
        }
        if (props.ErrorComponent) {
            return React.createElement(props.ErrorComponent, tslib_1.__assign({ retryImport: retry, error: error }, props.forwardProps));
        }
        throw error;
    }
    return null;
}
export { ImportedComponent };
