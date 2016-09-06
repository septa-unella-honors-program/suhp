var userModel = require('../models/userModel');
var goalModel = require('../models/goalModel');
var emailModel = require('../models/emailModel');

module.exports = {

    users: {
        get: function(req, res) {

            userModel.get(req, res);

        },
        post: function(req, res) {

            userModel.post(req, res);

        }

    },
    goals: {
        get: function(req, res) {

            goalModel.get(req, res);

        },
        post: function(req, res) {

            goalModel.post(req, res);

        },
        put: function(req, res) {

            goalModel.put(req, res);
        }

    },
    emails: {
        get: function(req, res) {

            emailModel.get(req, res);

        },
        post: function(req, res) {

            emailModel.post(req, res);
        }

    }


};
