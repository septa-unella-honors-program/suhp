var db = require('../db/db_config.js');

module.exports = {

    /*After initial sign up, user is prompted to enter a list of friends' emails
    This endpoint finds the user in the database, grabs his/her id, and creates
    a list of emails in the DB associated with the userID
    */

    post: function(req, res) {

        db.User.findOrCreate({
                where: {
                    username: req.body.username
                }
            })
            .spread(function(user) {
                let emailList = req.body.emails;
                emailList.forEach(function(address) {
                    db.Email.create({
                        UserId: user.get('id'),
                        email: address
                    })
                })
            })
            .then(function() {
                //User successfully created
                res.status(201).send('created');

            })
            .catch(function(err) {
                res.send(err);
            })
    }
};
