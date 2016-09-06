var db = require('../db/db_config.js');
var schedule = require('node-schedule');
var mailGun = require('../config/mailgun.js');

//local db fro cron job db
var goalCronJobDB={};

console.log("JUST AFTER CRON JOB DATABASE CREATION");
/* The following block of code finds all goals that are currently not expired and not completed and creates a cron job for each that executes at the specified deadline and send out the appropriate email blast. This executes with every server start in order have 'persistant' cron jobs*/

db.Goal.findAll({where:{
    hasExpired:false,
    hasCompleted:false
}})
.then(function(goals){
    goals.forEach(function(goal){
        //creating a req object to use in interactions with the Mailgun API (mimicing post requests)
        var req={body:{}};
        db.User.findOne({where:{id:goal.get('UserId')}})
        .then(function(user){
            req.body.username=user.get('username');
            req.body.description=goal.get('description');
            db.Email.findAll({ where: { 
                UserId: user.get('id')
                }})
                .then(function(emails){
                    var userEmailList=emails.map(function(email){
                        return email.get('email');
                    });
                    goalCronJobDB[goal.get('id')]={};
                    //make javascript Date objects to use as input for the cron jobs
                    console.log("goal shame deadline at "+goal.get('deadline') );
                    var shameDeadline = new Date( goal.get('deadline'));
                    console.log( "shameDeadline "+shameDeadline);
                    var reminderDeadline= new Date(goal.get('deadline'));
                    reminderDeadline.setDate(reminderDeadline.getDate()-2);
                    console.log( "reminderDeadline "+reminderDeadline);
                    
                    //create and add the 'cron jobs' for the reminder and shame email blasts
                    var goalJobDeadline= schedule.scheduleJob(reminderDeadline, function(){
                        console.log("reminderDeadline email sent");
                        mailGun.sendReminderEmails(userEmailList,req);
                    });
                    goalCronJobDB[goal.get('id')].goalJobDeadline=goalJobDeadline;

                    var goalJobShame=schedule.scheduleJob(shameDeadline, function(){
                        console.log("shame email sent");
                        mailGun.sendShameEmails(userEmailList,req);
                        goal.update({
                            hasExpired:true
                        });
                    });
                    goalCronJobDB[goal.get('id')].goalJobShame=goalJobShame;
            });
        });

    });
});

module.exports={
    /* finds goals based on a specific userId and returns an array of goal objects*/
	get:function(req, res){
        console.log(req.query);
        db.User.findOne({where:{username: req.query.username}})
        .then(function(user){
            db.Goal.findAll({where: {
            UserId:user.get('id')
            }})
            .then(function(goals) {
                res.send(goals);
            });
        })
        .catch(function(err) {
             res.status(404).send('There was an error retrieving data fromt he database', err);
        }); 
	},
	post:function(req,res){
        /*Posts a goal with the associated userId and then subsequently creates cron jobs to execute on the specified deadline*/
        var userId;
        var goalId;
        db.User.findOne({where:{username: req.body.username}})
        .then(function(user){
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

                    //make javascript Date objects to use as input for the cron jobs
                    var shameDeadline = new Date(req.body.deadline);
                    console.log( "shameDeadline "+shameDeadline);
                    console.log( "shameDeadline day"+ shameDeadline.getDate());
                    console.log( "shameDeadline month"+ shameDeadline.getMonth());
                    console.log( "shameDeadline year"+ shameDeadline.getFullYear());
                    var reminderDeadline= new Date(req.body.deadline);
                    reminderDeadline.setDate(reminderDeadline.getDate()-2);
                    console.log( "reminderDeadline "+reminderDeadline);
                    
                    //create and add the 'cron jobs' for the reminder and shame email blasts, add them to the cronjob local DB
                    var goalJobDeadline= schedule.scheduleJob(reminderDeadline, function(){
                        console.log("reminderDeadline email sent");
                        mailGun.sendReminderEmails(userEmailList,req);
                    });
                    goalCronJobDB[goalId].goalJobDeadline=goalJobDeadline;

                    var goalJobShame=schedule.scheduleJob(shameDeadline, function(){
                        console.log("shame email sent");
                        mailGun.sendShameEmails(userEmailList,req);
                        goal.update({
                            hasExpired:true
                        });
                    });
                    goalCronJobDB[goalId].goalJobShame=goalJobShame;
                    //the new goal ID is sent to the front end so that the verify button of the new object works properly
                    res.json(goalId);
                }); 
            });
        })
        .catch(function(err) {
            res.status(404).send('There was an error posting data to the database', err);
            }); 
	},
    put:function(req,res){
        //The exclusive purpose of this put function is to cancel the cron jobs associated with certain goals. When a goal is verified, the user sends a put requests with the specific goal in order to cancel the scheduled email blasts
        db.Goal.findOne({where:{id:req.query.goalId}})
        .then(function(goal){
            if(goalCronJobDB[req.query.goalId]){
                if(goalCronJobDB[req.query.goalId].goalJobDeadline){
                console.log("reminder email CANCELLED");
                goalCronJobDB[goal.get('id')].goalJobDeadline.cancel();
                }
            }
            if(goalCronJobDB[req.query.goalId]){
                if(goalCronJobDB[req.query.goalId].goalJobShame){
                console.log("deadline email CANCELLED");
                goalCronJobDB[req.query.goalId].goalJobShame.cancel();
                }
            }
            goal.update({
                hasCompleted:true
            })
            .then(function(){
                res.send("Successful update");
            });
        })
        .catch(function(err){
            res.status(404).send('There was an error updating data to the database', err);
        });
    }
};