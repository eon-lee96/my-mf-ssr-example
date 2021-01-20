/**
 * client-side only imported settings
 */
export interface ImportedClientSettings {
    /**
     * enabled hot module replacement
     * @autoconfig enabled if HMR is detected
     */
    hot: boolean;
    /**
     * Sets SSR mode
     * @autoconfig autodetects environment
     */
    SSR: boolean;
    /**
     * rethrows errors from loading
     * @autoconfig enabled in development
     */
    rethrowErrors: boolean;
    /**
     * Controls which imports should be controlled via imported
     * @default - everything non http
     */
    fileFilter: (url: string) => boolean;
    /**
     * Controls import signature matching
     * - true(default): checks signatures
     * - false: uses "marks"(file names) only
     */
    checkSignatures: boolean;
}
export declare const settings: {
    readonly hot: boolean;
    readonly SSR: boolean;
    readonly rethrowErrors: boolean;
    readonly fileFilter: (url: string) => boolean;
    readonly checkSignatures: boolean;
};
/**
 * allows fine tune imported logic
 * client side only!
 * @internal
 * @see configuration via imported.json {@link https://github.com/theKashey/react-imported-component#importedjs}
 */
export declare const setConfiguration: (config: Partial<ImportedClientSettings>) => void;
