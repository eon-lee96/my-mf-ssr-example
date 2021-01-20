import { settings } from '../configuration/config';
export var toKnownSignature = function (signature, marks) {
    return (!settings.checkSignatures && marks.join('|')) || signature;
};
export var markerOverlap = function (a1, a2) {
    return a1.filter(function (mark) { return a2.indexOf(mark) >= 0; }).length === a1.length;
};
