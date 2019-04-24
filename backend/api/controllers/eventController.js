// Import mongoose and contactService

const mongoose = require('mongoose');
const eventService = require('../services/eventService');

// Export different method

exports.list = (req, res) => {

    let callback = (event) => {
        res.status(200);
        res.json(event);
    }
    eventService.list({}, callback);
};

exports.userList = (req, res) => {
    let callback = (event) => {
        res.status(200);
        res.json(event);
    }
    eventService.list({username: req.params.username}, callback)
}

exports.post = (req, res) => {

    let newEvent = Object.assign({
        username: req.body.username, 
        title: req.body.title,
        location: req.body.location,
        starttime: req.body.starttime,
        endtime: req.body.endtime
    }, req.body),
        callback = function (event) {
        res.status(200);
        res.json(event);
    };
    eventService.save(newEvent, callback);
};

exports.get = (req, res) => {
    
    let callback = (event) => {
        res.status(200);
        res.json(event);
    };
    eventService.get({_id: req.params.eventId}, callback);
    
};

exports.patch = (req, res, next) => {
    
    let event = Object.assign({
        username: req.body.username, 
        title: req.body.title,
        location: req.body.location,
        starttime: req.body.starttime,
        endtime: req.body.endtime
    }, req.body);
    let callback = (event) => {
        res.status(200);
        res.json(event);
    };
    eventService.update(event, req.params.eventId, callback);

}

exports.delete = (req, res, next) => {
    let callback = () => {
        res.status(200);
        res.json({
            message: 'event Successfully deleted'
        });
    };
    eventService.delete(req.params.eventId, callback);

};