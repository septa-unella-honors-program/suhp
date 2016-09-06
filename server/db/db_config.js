/*The database consists of 3 tables: Users, Emails, and Goals.
A user contains a username, salt, email, hashed password, and password(set as VIRTUAL [ie. not visible in DB]).
A goal belongs to a user instance, thus each goal has userId associated with it. It has a description,
a deadline(in datetime format), hasExpired, and hasCompleted fields.
An email also belongs to a user and emails can be pulled by the associated userId. 
*/

var Sequelize = require('sequelize');
var pg = require('pg');
var db = new Sequelize('postgres://admin:IRYNMXNYKZSGGJXE@aws-us-east-1-portal.9.dblayer.com:11612/compose');
var bcrypt = require('bcrypt');

// Checks if the database has been loaded - appears in the console
db.authenticate()
    .then(function(err) {
        console.log('Successful Connection to the database');
    })
    .catch(function(err) {
        console.log('Cannot connect to the database', err);
    });

var User = db.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    salt: {
        type: Sequelize.STRING
    },
    email: Sequelize.STRING,
    password_hash: Sequelize.STRING,

    /*Password hashing and storage is done here. The 'salt' and 'hash' vars
    below use bcrypt for encryption and this.setDataValue sets the values to
    their collumn in the DB*/
    password: {
        type: Sequelize.VIRTUAL,
        set: function(val) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(val, salt);

            this.setDataValue('password', val);
            this.setDataValue('password_hash', hash);
            this.setDataValue('salt', salt);
        }
    }
});

var Goal = db.define('Goal', {
    description: Sequelize.STRING,
    deadline: Sequelize.DATE,
    hasExpired: Sequelize.BOOLEAN,
    hasCompleted: Sequelize.BOOLEAN
});

var Email = db.define('Email', {
    email: Sequelize.STRING,
});

Goal.belongsTo(User);
Email.belongsTo(User);

//Syncs tables to create tables 
User.sync();
Goal.sync();
Email.sync();

// will drop the tables and init them
//sequelize.sync({force:true}).then(function(){
//    console.log("Created tables in db.js");
//});


//Exports 3 tables to server file
exports.User = User;
exports.Goal = Goal;
exports.Email = Email;
