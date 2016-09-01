var db = require('../db/db_config.js');
var gif = require('../config/giphy.js');
var bcrypt = require('bcrypt');

module.exports= {

    /*This endpoint is used for siging in. The user is grabbed from the DB
    and the password that is passed in is compared against the user's password_hash
    using the bcrypt validation method 'compareSync'*/

	get:function(req,res){
        console.log('req', req);
        db.User.findOne({where: {
        username: req.query.username
        }})
        .then(function(user) {
            
            //check is user exists in DB, if not, send 404 error
            if(user == '') {
                res.status(404).send('User not found');
            } else {

                //compare password with has in db
                if(bcrypt.compareSync(req.query.password, user.password_hash)) {
                    res.status(200).send(user);            
                } else {
                    res.status(403).send('Incorrect password');
                }

            }
        })
        .catch(function(err) {
             res.status(404).send('There was an error retrieving data from the database', err);
        }); 
	},

    /*This endpoint is used for signing up to the application. It creates a user in the DB
    and is expecting a username, email, and password. The logic for password hashing
    is located in db/db_config.js*/

	post:function(req,res){
     db.User.create(
     	{username: req.body.username,
     	 email:req.body.email,
         password: req.body.password})
        .then(function(user) {
          res.sendStatus(200);  
        })
        .catch(function(err) {
            console.log('There was a DB error', err);
        })
	console.log("in user post model");
	}
};