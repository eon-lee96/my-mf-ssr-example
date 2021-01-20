import { ImportedConfiguration } from '../configuration/configuration';
export declare const encipherImport: (str: string) => string;
export declare const createTransformer: ({ types: t, template }: any, excludeMacro?: boolean, configuration?: ImportedConfiguration) => {
    traverse(programPath: any, fileName: string): void;
    finish(node: any, filename: string): void;
    hasImports: Set<string>;
};
export declare const babelPlugin: (babel: any, options?: ImportedConfiguration) => {
    inherits: any;
    visitor: {
        Program: {
            enter(programPath: any, { file }: any): void;
            exit({ node }: any, { file }: any): void;
        };
    };
};
