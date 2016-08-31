var db = require('../db/db_config.js');
var gif = require('../config/giphy.js');

module.exports={
	get:function(req,res){
        console.log('req', req.query);
        db.User.findAll({where: {
        username: req.query.username,
        password: req.query.password
        }})
        .then(function(user) {
            
            if(user == '') {
                res.status(404).send('User not found');
            } else {
                res.status(200).send(user);         
            }
        })
        .catch(function(err) {
             res.status(404).send('There was an error retrieving data fromthe database', err);
        }); 
	},

	post:function(req,res){
     db.User.findOrCreate({where: 
     	{username: req.body.username,
     	 email:req.body.email,
     	 password: req.body.password}})
        .spread(function(user, created) {

          res.sendStatus(created ? 201 : 200);
          
        });
	console.log("in user post model");
	}
};