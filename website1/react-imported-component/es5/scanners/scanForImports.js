"use strict";
/* tslint:disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = require("path");
// @ts-ignore
var scan_directory_1 = tslib_1.__importDefault(require("scan-directory"));
var fs_1 = require("fs");
var constants_1 = require("../configuration/constants");
var shared_1 = require("./shared");
var RESOLVE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];
var trimImport = function (str) { return str.replace(/['"]/g, ''); };
var getImportMatch = shared_1.getMatchString("(['\"]?[\\w-/.@]+['\"]?)\\)", 1);
var getImports = function (str) {
    return getImportMatch(str
        // remove comments
        .replace(/\/\*([^\*]*)\*\//gi, '')
        .replace(/\/\/(.*)/gi, '')
        // remove new lines
        .replace(/\n/gi, '')
        // remove spaces?
        .replace(/[\s]+\)/i, ')'));
};
var getComment = shared_1.getMatchString(/\/\*.*\*\//, 0);
var getChunkName = shared_1.getMatchString('webpackChunkName: "([^"]*)"', 1);
var clientSideOnly = function (comment) { return comment.indexOf(constants_1.CLIENT_SIDE_ONLY) >= 0; };
var clearComment = function (str) { return str.replace('webpackPrefetch: true', '').replace('webpackPreload: true', ''); };
var getImportString = function (pattern, selected) { return function (str) {
    return shared_1.getMatchString(pattern, selected)(str).map(function (statement) {
        return {
            name: trimImport(getImports(statement + ')')[0] || ''),
            comment: clearComment(getComment(statement)[0] || ''),
        };
    });
}; };
exports.getDynamicImports = getImportString("import[\\s]?\\((([^)])+['\"]?)\\)", 1);
var mapImports = function (file, imports) {
    return imports.map(function (dep) {
        var name = dep.name;
        if (name && name.charAt(0) === '.') {
            return tslib_1.__assign({}, dep, { file: file, name: path_1.resolve(path_1.dirname(file), name), doNotTransform: false });
        }
        return tslib_1.__assign({}, dep, { file: file, doNotTransform: true });
    });
};
var rejectSystemFiles = function (file, stats) {
    return (stats.isDirectory() && file.match(/node_modules/)) || file.match(/(\/\.\w+)/);
};
exports.remapImports = function (data, root, targetDir, getRelativeName, imports, testImport, chunkName) {
    return data
        .map(function (_a) {
        var file = _a.file, content = _a.content;
        return mapImports(file, exports.getDynamicImports(content));
    })
        .forEach(function (importBlock) {
        return importBlock.forEach(function (_a) {
            var name = _a.name, comment = _a.comment, doNotTransform = _a.doNotTransform, file = _a.file;
            var rootName = doNotTransform ? name : getRelativeName(root, name);
            var fileName = doNotTransform ? name : getRelativeName(targetDir, name);
            var sourceName = getRelativeName(root, file);
            if (testImport(rootName, sourceName)) {
                var isClientSideOnly = clientSideOnly(comment);
                var givenChunkName = getChunkName(comment)[0] || '';
                var def = "[() => import(" + comment + "'" + fileName + "'), '" + ((chunkName &&
                    chunkName(rootName, sourceName, { chunkName: givenChunkName })) ||
                    givenChunkName) + "', '" + rootName + "', " + isClientSideOnly + "] /* from " + sourceName + " */";
                var slot = getRelativeName(root, name);
                // keep the maximal definition
                imports[slot] = !imports[slot] ? def : imports[slot].length > def.length ? imports[slot] : def;
            }
        });
    });
};
function scanTop(root, start, target) {
    function scan() {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var configurationFile, _a, _b, testFile, _c, testImport, chunkName, configuration, files, data, imports, targetDir;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('scanning', start, 'for imports...');
                        configurationFile = path_1.join(root, '.imported.js');
                        _a = fs_1.existsSync(configurationFile) ? require(configurationFile) : {}, _b = _a.testFile, testFile = _b === void 0 ? function () { return true; } : _b, _c = _a.testImport, testImport = _c === void 0 ? function () { return true; } : _c, chunkName = _a.chunkName, configuration = _a.configuration;
                        return [4 /*yield*/, scan_directory_1.default(path_1.join(root, start), undefined, rejectSystemFiles)];
                    case 1:
                        files = (_d.sent())
                            .filter(function (name) { return shared_1.normalizePath(name).indexOf(target) === -1; })
                            .filter(function (name) { return RESOLVE_EXTENSIONS.indexOf(path_1.extname(name)) >= 0; })
                            .filter(function (name) { return testFile(name); })
                            .sort();
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var content;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, shared_1.getFileContent(file)];
                                        case 1:
                                            content = _a.sent();
                                            return [2 /*return*/, {
                                                    file: file,
                                                    content: content,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        data = _d.sent();
                        imports = {};
                        targetDir = path_1.resolve(root, path_1.dirname(target));
                        exports.remapImports(data, root, targetDir, shared_1.getRelative, imports, testImport, chunkName);
                        console.log(Object.keys(imports).length + " imports found, saving to " + target);
                        shared_1.pWriteFile(target, "\n    /* eslint-disable */\n    /* tslint:disable */\n    \n    // generated by react-imported-component, DO NOT EDIT     \n    import {assignImportedComponents} from 'react-imported-component/macro';\n    " + (configuration &&
                            "import {setConfiguration} from 'react-imported-component/boot';\n// as configured in .imported.js\nsetConfiguration(" + JSON.stringify(configuration, null, 2) + ");\n    ") + "    \n    \n    // all your imports are defined here\n    // all, even the ones you tried to hide in comments (that's the cost of making a very fast parser)\n    // to remove any import from here\n    // 1) use magic comment `import(/* client-side */ './myFile')` - and it will disappear\n    // 2) use file filter to ignore specific locations (refer to the README - https://github.com/theKashey/react-imported-component/#server-side-auto-import)\n    // 3) use .imported.js to control this table generation (refer to the README - https://github.com/theKashey/react-imported-component/#-imported-js)\n    \n    const applicationImports = assignImportedComponents([\n" + Object.keys(imports)
                            .map(function (key) { return "      " + imports[key] + ","; })
                            .sort()
                            .join('\n') + "\n    ]);\n    \n    export default applicationImports;\n    \n    // @ts-ignore\n    if (module.hot) {\n       // these imports would make this module a parent for the imported modules.\n       // but this is just a helper - so ignore(and accept!) all updates\n       \n       // @ts-ignore\n       module.hot.accept(() => null);\n    }    \n    ");
                        return [2 /*return*/];
                }
            });
        });
    }
    return scan();
}
// --------
if (!process.argv[3]) {
    console.log('usage: imported-components sourceRoot targetFile');
    console.log('example: imported-components src src/importedComponents.js');
}
else {
    scanTop(process.cwd(), process.argv[2], process.argv[3]);
}
