var db = require('../db/db_config.js');
var gif = require('../config/giphy.js');
var bcrypt = require('bcrypt');

module.exports= {

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
                console.log('does pass match? ', bcrypt.compareSync(req.query.password, user.password_hash));
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