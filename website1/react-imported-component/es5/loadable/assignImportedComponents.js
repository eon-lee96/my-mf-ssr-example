"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../configuration/config");
var metadata_1 = require("./metadata");
var pending_1 = require("./pending");
var registry_1 = require("./registry");
var toLoadable_1 = require("./toLoadable");
/**
 * to be used __only via CLI tools__
 */
exports.assignImportedComponents = function (set) {
    var countBefore = registry_1.LOADABLE_SIGNATURE.size;
    set.forEach(function (imported) {
        var allowAutoLoad = !(imported[3] || !config_1.settings.fileFilter(imported[2]));
        var loadable = toLoadable_1.toLoadable(imported[0], allowAutoLoad);
        metadata_1.assignMetaData(loadable.mark, loadable, imported[1], imported[2]);
    });
    if (countBefore === registry_1.LOADABLE_SIGNATURE.size) {
        // tslint:disable-next-line:no-console
        console.error('react-imported-component: no import-marks found, please check babel plugin');
    }
    pending_1.done();
    return set;
};
