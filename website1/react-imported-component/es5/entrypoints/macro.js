"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var babel_plugin_macros_1 = require("babel-plugin-macros");
var babel_1 = require("../babel/babel");
var assignImportedComponents_1 = require("../loadable/assignImportedComponents");
exports.assignImportedComponents = assignImportedComponents_1.assignImportedComponents;
function getMacroType(tagName) {
    switch (tagName) {
        case 'importedModule':
        case 'imported':
        case 'lazy':
        case 'useImported':
        case 'ImportedModule':
        case 'ImportedComponent':
            return 'react-imported-component';
        case 'assignImportedComponents':
            return 'react-imported-component/boot';
        default:
            return false;
    }
}
function macro(_a) {
    var references = _a.references, state = _a.state, babel = _a.babel;
    var t = babel.types;
    var fileName = state.file.opts.filename;
    var imports = {};
    var transformer = babel_1.createTransformer(babel, true);
    Object.keys(references).forEach(function (tagName) {
        var origin = getMacroType(tagName);
        if (origin) {
            imports[origin] = imports[origin] || [];
            imports[origin].push(tagName);
            var tags = references[tagName];
            tags.forEach(function (tag) {
                var expression = tag.parentPath;
                if (t.isCallExpression(expression)) {
                    transformer.traverse(expression, fileName);
                }
            });
        }
    });
    addReactImports(babel, state, imports);
    transformer.traverse(state.file.path, fileName);
    transformer.finish(state.file.path.node, fileName);
}
function addReactImports(babel, state, importsGroups) {
    var t = babel.types;
    return Object.keys(importsGroups)
        .map(function (origin) {
        var imports = importsGroups[origin];
        if (!imports.length) {
            return false;
        }
        var importedImport = state.file.path.node.body.find(function (importNode) { return t.isImportDeclaration(importNode) && importNode.source.value === origin; });
        // Handle adding the import or altering the existing import
        if (importedImport) {
            imports.forEach(function (name) {
                if (!importedImport.specifiers.find(function (specifier) { return specifier.imported && specifier.imported.name === name; })) {
                    importedImport.specifiers.push(t.importSpecifier(t.identifier(name), t.identifier(name)));
                }
            });
        }
        else {
            state.file.path.node.body.unshift(t.importDeclaration(imports.map(function (name) { return t.importSpecifier(t.identifier(name), t.identifier(name)); }), t.stringLiteral(origin)));
        }
        return true;
    })
        .some(Boolean);
}
var neverCallMe = function () {
    throw new Error('you have used `react-imported-component/macro` without `babel-plugin-macro` or `react-hot-loader/babel` installed');
};
var lazy = neverCallMe;
exports.lazy = lazy;
var imported = neverCallMe;
exports.imported = imported;
var importedModule = neverCallMe;
exports.importedModule = importedModule;
var useImported = neverCallMe;
exports.useImported = useImported;
var ImportedModule = neverCallMe;
exports.ImportedModule = ImportedModule;
var ImportedComponent = neverCallMe;
exports.ImportedComponent = ImportedComponent;
exports.default = babel_plugin_macros_1.createMacro(macro);
