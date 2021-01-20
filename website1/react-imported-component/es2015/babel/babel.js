import * as tslib_1 from "tslib";
// @ts-ignore
import * as crc32 from 'crc-32';
import { existsSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { processComment } from './magic-comments';
export var encipherImport = function (str) {
    return crc32.str(str).toString(32);
};
// Babel v7 compat
var syntax;
try {
    syntax = require('babel-plugin-syntax-dynamic-import');
}
catch (err) {
    try {
        syntax = require('@babel/plugin-syntax-dynamic-import');
    }
    catch (e) {
        throw new Error('react-imported-component babel plugin is requiring `babel-plugin-syntax-dynamic-import` or `@babel/plugin-syntax-dynamic-import` to work. Please add this dependency.');
    }
}
syntax = syntax.default || syntax;
var resolveImport = function (importName, file) {
    if (file === void 0) { file = ''; }
    if (importName.charAt(0) === '.') {
        return relative(process.cwd(), resolve(dirname(file), importName));
    }
    return importName;
};
var templateOptions = {
    placeholderPattern: /^([A-Z0-9]+)([A-Z0-9_]+)$/,
};
function getImportArg(callPath) {
    return callPath.get('arguments.0');
}
function getComments(callPath) {
    return callPath.has('leadingComments') ? callPath.get('leadingComments') : [];
}
// load configuration
var configurationFile = join(process.cwd(), '.imported.js');
var defaultConfiguration = (existsSync(configurationFile)
    ? require(configurationFile)
    : {});
export var createTransformer = function (_a, excludeMacro, configuration) {
    var t = _a.types, template = _a.template;
    if (excludeMacro === void 0) { excludeMacro = false; }
    if (configuration === void 0) { configuration = defaultConfiguration; }
    var headerTemplate = template("var importedWrapper = require('react-imported-component/wrapper');", templateOptions);
    var importRegistration = template('importedWrapper(MARK, IMPORT)', templateOptions);
    var hasImports = new Set();
    var visitedNodes = new Map();
    return {
        traverse: function (programPath, fileName) {
            var isBootstrapFile = false;
            programPath.traverse({
                ImportDeclaration: function (path) {
                    if (excludeMacro) {
                        return;
                    }
                    var source = path.node.source.value;
                    if (source === 'react-imported-component/macro') {
                        var specifiers = path.node.specifiers;
                        path.remove();
                        var assignName = 'assignImportedComponents';
                        if (specifiers.length === 1 && specifiers[0].imported.name === assignName) {
                            isBootstrapFile = true;
                            programPath.node.body.unshift(t.importDeclaration([t.importSpecifier(t.identifier(assignName), t.identifier(assignName))], t.stringLiteral('react-imported-component/boot')));
                        }
                        else {
                            programPath.node.body.unshift(t.importDeclaration(specifiers.map(function (spec) {
                                return t.importSpecifier(t.identifier(spec.imported.name), t.identifier(spec.imported.name));
                            }), t.stringLiteral('react-imported-component')));
                        }
                    }
                },
                Import: function (_a) {
                    var parentPath = _a.parentPath;
                    if (visitedNodes.has(parentPath.node)) {
                        return;
                    }
                    var newImport = parentPath.node;
                    var rawImport = getImportArg(parentPath);
                    var importName = rawImport.node.value;
                    var rawComments = getComments(rawImport);
                    var comments = rawComments.map(function (parent) { return parent.node.value; });
                    var newComments = processComment(configuration, comments, importName, fileName, {
                        isBootstrapFile: isBootstrapFile,
                    });
                    if (newComments !== comments) {
                        rawComments.forEach(function (comment) { return comment.remove(); });
                        newComments.forEach(function (comment) {
                            rawImport.addComment('leading', " " + comment + " ");
                        });
                    }
                    if (!importName) {
                        return;
                    }
                    var requiredFileHash = encipherImport(resolveImport(importName, fileName));
                    var replace = null;
                    replace = importRegistration({
                        MARK: t.stringLiteral("imported_" + requiredFileHash + "_component"),
                        IMPORT: newImport,
                    });
                    hasImports.add(fileName);
                    visitedNodes.set(newImport, true);
                    parentPath.replaceWith(replace);
                },
            });
        },
        finish: function (node, filename) {
            if (!hasImports.has(filename)) {
                return;
            }
            node.body.unshift(headerTemplate());
        },
        hasImports: hasImports,
    };
};
export var babelPlugin = function (babel, options) {
    if (options === void 0) { options = {}; }
    var transformer = createTransformer(babel, false, tslib_1.__assign({}, defaultConfiguration, options));
    return {
        inherits: syntax,
        visitor: {
            Program: {
                enter: function (programPath, _a) {
                    var file = _a.file;
                    transformer.traverse(programPath, file.opts.filename);
                },
                exit: function (_a, _b) {
                    var node = _a.node;
                    var file = _b.file;
                    transformer.finish(node, file.opts.filename);
                },
            },
        },
    };
};
