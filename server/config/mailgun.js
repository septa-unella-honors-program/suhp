var key = require('./server_config.js');
var domain = 'sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: key.mg, domain: domain});
var gif = require('./giphy.js');


module.exports = {

	sendInitialEmails: function(userEmailList, req, res) {
		
		//Attempt to attach gif to email
		//async issues - have to get the url first, then send the emails
		//As of now, mail sends before gif request finishes and url is undefined
		gif.welcomeEmailGif(req,res).then(function(url) {

		console.log('this is the url', url);
		});

		userEmailList.forEach(function(email) {
		 	var data = {
			from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
			to: email,
			subject: `Help your friend ${req.body.username} achieve their goal!`,
			html: `Your friend ${req.body.username} wants you to support them in accomplishing their goal!
			       <img src=${gifUrl}></img>
			       <p>Gif url: ${gifUrl}</p>`
		};

			mailgun.messages().send(data, function(error, body) {
				console.log('body', body);
			});
		});

	 },

	 sendReminderEmails: function(goalObj, req, res) {

	 	var data = {
		from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
		to: 'lsfisher@usc.edu',
		subject: 'Remind ${userName} to keep working on their goal!',
		text: '${userName}\'s goal deadline is almost here! Remind them to keep working on ${goal}'
	};

		mailgun.messages().send(data, function(error, body) {
			console.log('body', body);
		});
	 },

	  sendShameEmails: function(goalObj, req, res) {

	 	var data = {
		from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
		to: 'lsfisher@usc.edu',
		subject: 'Shame...${userName} wasn\'t able to accomplish their goal in time!',
		text: '${userName} wasn\'t able to ${goal}! Shame! Shame! Shame!'
	};

		mailgun.messages().send(data, function(error, body) {
			console.log('body', body);
		});
	 }
} 
