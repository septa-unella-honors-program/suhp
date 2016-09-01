var db = require('../db/db_config.js');
var schedule = require('node-schedule');
var mailGun = require('../config/mailgun.js');
// var utils = require('../config/util.js');

var goalCronJobDB={};



module.exports={
	get:function(req, res){
        console.log(req.query);
        db.User.findOrCreate({where:{username: req.query.username}})
        .spread(function(user){
            db.Goal.findAll({where: {
            UserId:user.get('id')
            }})
            .then(function(goals) {
                //console.log(goals);
                res.send(goals);
            });
        })
        .catch(function(err) {
             res.status(404).send('There was an error retrieving data fromt he database', err);
        }); 
        // res.send("JUST A TEST");
	},
	post:function(req,res){
        var userId;
        var goalId;
        db.User.findOrCreate({where:{username: req.body.username}})
        .spread(function(user){
            console.log("USER ID of "+req.body.username+"  "+user.get('id'));
            userId=user.get('id');
            db.Goal.findOrCreate({where: 
         	{
         	 description:req.body.description,
         	 deadline: req.body.deadline,
         	 hasExpired:false,
         	 hasCompleted:false,
         	 UserId:user.get('id')
         	 }})
            .spread(function(goal, created) {
                goalId=goal.get('id');
                console.log("UserId of new emails "+userId);
                db.Email.findAll({ where: { 
                UserId: userId
                }})
                .then(function(emails){
                    var userEmailList=emails.map(function(email){
                        return email.get('email');
                    });
                    console.log(userEmailList);
                    //res.send(emails);
                    mailGun.sendInitialEmails(userEmailList, req);

                    goalCronJobDB[goalId]={};

                    var shameDeadline = new Date(req.body.deadline);
                    console.log( "shameDeadline "+shameDeadline);
                    console.log( "shameDeadline day"+ shameDeadline.getDate());
                    console.log( "shameDeadline month"+ shameDeadline.getMonth());
                    console.log( "shameDeadline year"+ shameDeadline.getFullYear());

                    var reminderDeadline= new Date(req.body.deadline);
                    reminderDeadline.setDate(reminderDeadline.getDate()-2);
                    console.log( "reminderDeadline "+reminderDeadline);
                    

                    var goalJobDeadline= schedule.scheduleJob(reminderDeadline, function(){
                        console.log("reminderDeadline email sent");
                        mailGun.sendReminderEmails(userEmailList,req);
                    });
                    goalCronJobDB[goalId].goalJobDeadline=goalJobDeadline;

                    var goalJobShame=schedule.scheduleJob(shameDeadline, function(){
                        console.log("shame email sent");
                        mailGun.sendShameEmails(userEmailList,req);
                    });

                    goalCronJobDB[goalId].goalJobShame=goalJobShame;

                    res.json(goalCronJobDB);

                    
                    

                    res.sendStatus(created ? 201 : 200);
                }); 
            });
        })
        .catch(function(err) {
            res.status(404).send('There was an error posting data to the database', err);
            }); 
	},
    put:function(req,res){

        db.Goal.findOrCreate({where:{id:req.query.goalId}})
        .spread(function(goal){
            console.log(goalCronJobDB);
            console.log(goalCronJobDB[req.query.goalId]);
            console.log(goalCronJobDB[req.query.goalId].goalJobDeadline);
            console.log(goalCronJobDB[req.query.goalId].goalJobShame);
            res.json(goalCronJobDB);
            if(goalCronJobDB[req.query.goalId].goalJobDeadline){
                goalCronJobDB[goal.get('id')].goalJobDeadline.cancel();
            }

            if(goalCronJobDB[req.query.goalId].goalJobShame){
                goalCronJobDB[req.query.goalId].goalJobShame.cancel();
            }

            goal.update({
                hasCompleted:true
            })
            .then(function(){
                //res.send("Successful update");
            });
        })
        .catch(function(err){
            res.status(404).send('There was an error updating data to the database', err);
        });
    }
};