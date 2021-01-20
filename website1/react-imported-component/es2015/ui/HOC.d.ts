import * as React from 'react';
import { ComponentOptions, DefaultComponentImport, HOCOptions, HOCType, LazyImport } from '../types';
/**
 * creates a "lazy" component, like `React.lazy`
 * @see {@link useImported} or {@link useLazy}
 * @param {Function} loaderFunction - () => import('a'), or () => require('b')
 * @param {Object} [options]
 * @param {React.Component} [options.LoadingComponent]
 * @param {React.Component} [options.ErrorComponent]
 * @param {Function} [options.onError] - error handler. Will consume the real error.
 * @param {Function} [options.async = false] - enable React 16+ suspense.
 *
 * @example
 * const PageA = imported('./pageA', { async: true });
 */
declare function loader<P, K = P>(loaderFunction: DefaultComponentImport<P>, baseOptions?: Partial<ComponentOptions<P, K>> & HOCOptions): HOCType<P, K>;
/**
 * React.lazy "as-is" replacement
 */
export declare function lazy<T>(importer: LazyImport<T>): React.FC<T>;
export default loader;
