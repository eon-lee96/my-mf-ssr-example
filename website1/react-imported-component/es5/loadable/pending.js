"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * pending indicates any ongoing procceses
 */
var pending = [];
exports.addPending = function (promise) { return pending.push(promise); };
exports.removeFromPending = function (promise) { return (pending = pending.filter(function (a) { return a !== promise; })); };
/**
 * is it really ready?
 */
var readyFlag = false;
exports.isItReady = function () { return readyFlag; };
/**
 * waits for all necessary imports to be fulfilled
 */
exports.done = function () {
    if (pending.length) {
        readyFlag = false;
        return Promise.all(pending)
            .then(function (a) { return a[1]; })
            .then(exports.done);
    }
    readyFlag = true;
    return Promise.resolve();
};
