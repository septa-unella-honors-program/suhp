var db = require('../db/db_config.js');

module.exports = {

	getUserEmailList: function(req, res) {
		db.User.findOne({ where: {
			username: req.query.username
		}})
		.then(function(user) {
			db.Email.findAll({ where: { 
				UserId: user.get('id')
			}})
			.then(function(emails) {
				res.status(200).send(emails);
			})
			.catch(function(err) {
				res.status(404).send('There was an error retrieving data from the database', err);
			})
		});
	}
}