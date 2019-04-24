// Import mongoose and contactService

const mongoose = require('mongoose');
const userService = require('../services/userService');

// Export different method

exports.list = (req, res) => {

    let callback = (user) => {
        res.status(200);
        res.json(user);
    }
    userService.list({}, callback);
};

exports.post = (req, res) => {

    let newUser = Object.assign({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }, req.body),
        callback = function (user) {
        res.status(200);
        res.json(user);
    };
    userService.save(newUser, callback);
};

exports.get = (req, res) => {
    
    let callback = (user) => {
        res.status(200);
        res.json(user);
    };
    userService.get({username: req.params.username}, callback);
    
};

exports.patch = (req, res, next) => {
    
    let user = Object.assign({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }, req.body);
    let callback = (user) => {
        res.status(200);
        res.json(user);
    };
    userService.update(user, callback);

}

exports.delete = (req, res, next) => {
    
    let callback = (user) => {
        res.status(200);
        res.json({
            message: 'user Successfully deleted'
        });
    };
    userService.delete(req.params.username, callback);

};