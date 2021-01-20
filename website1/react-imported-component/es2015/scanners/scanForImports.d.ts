interface MappedImport {
    name: string;
    comment: string;
}
interface FileContent {
    file: string;
    content: string;
}
export declare const getDynamicImports: (str: string) => MappedImport[];
export declare const remapImports: (data: FileContent[], root: string, targetDir: string, getRelativeName: (a: string, b: string) => string, imports: Record<string, string>, testImport: (targetFileName: string, sourceFileName: string) => boolean, chunkName?: ((targetFile: string, sourceFile: string, importOptions: import("../configuration/configuration").KnownImportOptions | Record<string, string | boolean>) => string | null | undefined) | undefined) => void;
export {};
