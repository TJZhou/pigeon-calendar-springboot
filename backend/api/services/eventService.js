const Event = require('../models/eventModel');

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

exports.list = (params, callback) => {
    let resultCallback = (err, event) => {
        throwError(err);
        callback(event);
    }
    Event.find(params, resultCallback);
}

exports.save = function (event, callback) {
    let newEvent = new Event(event),
    resultCallback = (err, event) => {
        throwError(err);
        callback(event);
    };
    newEvent.save(resultCallback);
};

exports.get = function (params, callback) {
    let resultCallback = function (err, event) {
        throwError(err);
        callback(event);
    };
    Event.find(params, resultCallback);
};

exports.update = function (event, id, callback) {
    let resultCallback = function (err, event) {
        throwError(err);
        callback(event);
    };
    Event.findOneAndUpdate({
        _id: id
    }, event, {
        new: true
    }, resultCallback);
};

exports.delete = function (id, callback) {
    let resultCallback = function (err) {
        throwError(err);
        callback();
    };
    Event.findOneAndRemove({
        _id: id
    }, resultCallback);
};