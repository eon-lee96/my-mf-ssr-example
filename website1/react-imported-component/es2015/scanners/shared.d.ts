/// <reference types="node" />
import { readFile, writeFile } from 'fs';
export declare const normalizePath: (path: string) => string;
export declare const getRelative: (from: string, to: string) => string;
export declare const getMatchString: (pattern: string, selected: number) => (str: string) => string[];
export declare const pReadFile: typeof readFile.__promisify__;
export declare const pWriteFile: typeof writeFile.__promisify__;
export declare const getFileContent: (file: string) => Promise<string>;
