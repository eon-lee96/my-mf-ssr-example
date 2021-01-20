import { ImportedConfiguration } from '../configuration/configuration';
export declare const processComment: (configuration: ImportedConfiguration, comments: string[], importName: string, fileName: string, options: {
    isBootstrapFile: boolean;
}) => string[];
