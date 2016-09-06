var express = require('express');
//middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var router =require('./config/routes');

//create db
var db = require('./db/db_config.js');

//require mailgun api
var mailgun = require('./config/mailgun.js');

//create router
var router = require('./config/routes.js');
var app = express();

//add middleware
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(express.static('client'));
app.use(morgan('dev'));

// All incoming requests are sent to the routers located in the config/routes.js file
app.use('/', router);


app.set('port', process.env.PORT || 8080);



app.listen(app.get('port'), function(){
	console.log("Listening on port "+app.get('port'));
});


