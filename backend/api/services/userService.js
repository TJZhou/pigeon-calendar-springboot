const User = require('../models/userModel');

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


/**
 * Returns an array of User object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */


exports.list = (params, callback) => {
    let resultCallback = (err, user) => {
        throwError(err);
        callback(user);
    }
    User.find(params, resultCallback);
}


/**
 * Saves and returns the new user object.
 *
 * @param {Object} user {User object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (user, callback) {
    let newUser = new User(user),
    resultCallback = (err, user) => {
        throwError(err);
        callback(user);
    };
    newUser.save(resultCallback);
};


/**
 * Returns the User object matching the id.
 *
 * @param {string} userId {Id of the user object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (params, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.find(params, resultCallback);
};

/**
 * Updates and returns the user object.
 *
 * @param {Object} user {User object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function (user, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.findOneAndUpdate({
        username: user.username
    }, user, {
        new: true
    }, resultCallback);
};


/**
 * Deletes the user object matching the id.
 *
 * @param {string} userId {Id of the user object}
 * @param {function} callback {Sucess callback function}
 */
exports.delete = function (username, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback();
    };
    User.remove({
        username: username
    }, resultCallback);
};