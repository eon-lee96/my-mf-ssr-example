import * as React from 'react';
/**
 * React.Suspense "as-is" replacement
 */
declare const Boundary: React.ExoticComponent<React.SuspenseProps> | React.FunctionComponent<{
    fallback: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | null;
}>;
export default Boundary;
