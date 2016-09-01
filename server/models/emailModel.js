var db = require('../db/db_config.js');
var util = require('../config/util.js');
var mg = require('../config/mailgun.js'); //Require mailgun methods

module.exports={
	get:function(req, res){
		util.getUserEmailList(req, res);
	},
	post:function(req, res){
		console.log("INSIDE EMAIL POST");
		console.log(req.body);
		db.User.findOrCreate({where: {
			username: req.body.username
		}})
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

			//When a user is created, an initial email is sent out to user's email list
			//mg.sendInitialEmails(req.body.emails, req, res);
			res.status(201).send('created');

		})
		.catch(function(err) {
		  	res.send('There was an error ', err);
		  })
	}
};

