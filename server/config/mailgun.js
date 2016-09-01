var key = require('./server_config.js');
var domain = 'sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: key.mg, domain: domain });
var gif = require('./giphy.js');


module.exports = {

    sendInitialEmails: function(userEmailList, req) {
        //3 'Help Me' gifs from giphy
        let gifList = ['http://media4.giphy.com/media/Y8ocCgwtdj29O/200w_d.gif',
            'https://media4.giphy.com/media/l46Cbqvg6gxGvh2PS/200_d.gif',
            'http://media3.giphy.com/media/TTgdzuFXGvEKCNO6JRC/200_d.gif'
        ];

        userEmailList.forEach(function(email) {
            //Set a random index to set on gifList so that a random welcome gif is attached to each email sent
            let randomIndex = Math.floor(Math.random() * gifList.length);

            let message = `<div style='display:flex;'>
      						<div style='flex-direction:row;'>
	          					<p>Your friend 
	          					<span style='font-weight:bold'>${req.body.username} </span>
	          					wants you to support them in accomplishing their goal ${req.body.description}!</p>
	          					<div style='text-align:center;'>
	          					<img src=${gifList[randomIndex]}></img>
	          					</div>
      						</div>
  						   </div>`
            console.log(email);
            var data = {
                from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
                to: email,
                subject: `Help your friend ${req.body.username} achieve their goal!`,
                html: message

            };

            mailgun.messages().send(data, function(error, body) {
                console.log('body', body);
            });
        });

    },

    sendReminderEmails: function(userEmailList, req) {
        userEmailList.forEach(function(email){
        var data = {
            from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
            to: email,
            subject: `Remind ${req.body.username} to keep working on their goal!`,
            text: `${req.body.username}\'s goal deadline is almost here! Remind them to keep working on ${req.body.description}`
        };

        mailgun.messages().send(data, function(error, body) {
            console.log('body', body);
            });
        });
    },

    sendShameEmails: function(userEmailList, req) {
        userEmailList.forEach(function(email){
        var data = {
            from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
            to: email,
            subject: `Shame...${req.body.username} wasn\'t able to accomplish their goal in time!`,
            text: `${req.body.username} wasn\'t able to ${req.body.description}! Shame! Shame! Shame!`
        };

        mailgun.messages().send(data, function(error, body) {
            console.log('body', body);
            });
        });
    }
};
