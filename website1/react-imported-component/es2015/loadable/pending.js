/**
 * pending indicates any ongoing procceses
 */
var pending = [];
export var addPending = function (promise) { return pending.push(promise); };
export var removeFromPending = function (promise) { return (pending = pending.filter(function (a) { return a !== promise; })); };
/**
 * is it really ready?
 */
var readyFlag = false;
export var isItReady = function () { return readyFlag; };
/**
 * waits for all necessary imports to be fulfilled
 */
export var done = function () {
    if (pending.length) {
        readyFlag = false;
        return Promise.all(pending)
            .then(function (a) { return a[1]; })
            .then(done);
    }
    readyFlag = true;
    return Promise.resolve();
};
