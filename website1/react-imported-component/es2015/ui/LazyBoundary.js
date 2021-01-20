import * as React from 'react';
import { isBackend } from '../utils/detectBackend';
var LazyBoundary = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
/**
 * React.Suspense "as-is" replacement
 */
var Boundary = isBackend ? LazyBoundary : React.Suspense;
export default Boundary;
