/*In this file, the server connects to the mailgun API to send messages to users
The mailgun api requires a key, which was imported from './server_config.js'
*/


/*
Setting up mailgun
    1) Create an account at: https://mailgun.com/sessions/new
    2) Find your sandbox/test doman
    3) Add authorized recipients to the account. (Mailgun's test 
       domain will only send emails to authorized recipients)
    4) Make sure to confirm authorization in your email
    5) You're good to go!
*/
var key = require('./server_config.js');
var domain = 'sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org';
//Mailgun takes 2 parameters: a key and the domain address
var mailgun = require('mailgun-js')({ apiKey: key.mg, domain: domain });


module.exports = {

    /*This function sends an email to a user's email list every time he/she adds a goal. It's 
    invoked in the server/models/goalModel.js file*/
    sendInitialEmails: function(userEmailList, req) {

        //3 'Help Me' gifs from giphy
        let gifList = ['http://media4.giphy.com/media/Y8ocCgwtdj29O/200w_d.gif',
            'https://media4.giphy.com/media/l46Cbqvg6gxGvh2PS/200_d.gif',
            'http://media3.giphy.com/media/TTgdzuFXGvEKCNO6JRC/200_d.gif'
        ];

        userEmailList.forEach(function(email) {
            //Set a random index to set on gifList so that a random welcome gif is attached to each email sent
            let randomIndex = Math.floor(Math.random() * gifList.length);
            //Message text & gif for email
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
                // This is the body of the email
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

    /*This function is wrapped in a cronjob in models/goalModel.js and sends a reminder 
    email to the user's email list 2 days before a user's goal deadline has been reached*/
    sendReminderEmails: function(userEmailList, req) {

        //3 'Reminder' gifs from giphy
        let gifList = ['http://media4.giphy.com/media/kKHYvXhLx1EqI/200w_d.gif',
            'https://media4.giphy.com/media/hMAEwSXJR5qSY/200_d.gif',
            'http://media3.giphy.com/media/2jRqS4vxh2ety/200_d.gif'
        ];

        userEmailList.forEach(function(email) {

            let randomIndex = Math.floor(Math.random() * gifList.length);

            let message = `<div style='display:flex;'>
                            <div style='flex-direction:row;'>
                                <p><span style='font-weight:bold'>${req.body.username}'s </span>
                                goal deadline is almost here! Remind them to keep
                                working on ${req.body.description}!</p>
                                <div style='text-align:center;'>
                                <img src=${gifList[randomIndex]}></img>
                                </div>
                            </div>
                           </div>`

            var data = {
                from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
                to: email,
                subject: `Remind ${req.body.username} to keep working on their goal!`,
                html: message
            };

            mailgun.messages().send(data, function(error, body) {
                console.log('body', body);
            });
        });
    },

    /*This function is wrapped in a cronjob in models/goalModel.js and sends a shame 
    email to the user's email list as soon as the goal deadline has passed*/
    sendShameEmails: function(userEmailList, req) {

        //3 'Shame' gifs from giphy
        let gifList = ['http://media4.giphy.com/media/eP1fobjusSbu/200w_d.gif',
            'https://media4.giphy.com/media/m6tmCnGCNvTby/200_d.gif',
            'http://media3.giphy.com/media/m6ljvZNi8xnvG/200_d.gif'
        ];

        userEmailList.forEach(function(email) {

            let randomIndex = Math.floor(Math.random() * gifList.length);

            let message = `<div style='display:flex;'>
                            <div style='flex-direction:row;'>
                                <p>Shame...<span style='font-weight:bold'>${req.body.username}</span>
                                wasn't able to ${req.body.description}! Shame! Shame! Shame!</p>
                                <div style='text-align:center;'>
                                <img src=${gifList[randomIndex]}></img>
                                </div>
                            </div>
                           </div>`


            var data = {
                from: 'SUHP <postmaster@sandboxfc8ed1e2db424ce48574ca88fa53eb0e.mailgun.org>',
                to: email,
                subject: `Shame...${req.body.username} wasn\'t able to accomplish their goal in time!`,
                html: message
            };

            mailgun.messages().send(data, function(error, body) {
                console.log('body', body);
            });
        });
    }
};
