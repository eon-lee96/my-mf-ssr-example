import { settings } from '../configuration/config';
import { assignMetaData } from './metadata';
import { done } from './pending';
import { LOADABLE_SIGNATURE } from './registry';
import { toLoadable } from './toLoadable';
/**
 * to be used __only via CLI tools__
 */
export var assignImportedComponents = function (set) {
    var countBefore = LOADABLE_SIGNATURE.size;
    set.forEach(function (imported) {
        var allowAutoLoad = !(imported[3] || !settings.fileFilter(imported[2]));
        var loadable = toLoadable(imported[0], allowAutoLoad);
        assignMetaData(loadable.mark, loadable, imported[1], imported[2]);
    });
    if (countBefore === LOADABLE_SIGNATURE.size) {
        // tslint:disable-next-line:no-console
        console.error('react-imported-component: no import-marks found, please check babel plugin');
    }
    done();
    return set;
};
