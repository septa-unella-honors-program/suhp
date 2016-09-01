var userModel = require('../models/userModel');
var goalModel = require('../models/goalModel');
var emailModel = require('../models/emailModel');

module.exports={

	users:{
		get: function(req,res){
			
			userModel.get(req,res);
			
		},
		post: function(req,res){
			console.log("in user post controller");
			console.log(req.body);
			console.log("*********");
			userModel.post(req,res);
			
		}

	},
	goals:{
		get: function(req,res){
			console.log("in goals get controller");
			console.log(req.query);
			console.log("*********");
			goalModel.get(req, res);
			

		},
		post: function(req,res){
			console.log("in goals get controller");
			console.log(req.body);
			console.log("*********");
			goalModel.post(req,res);
			
		},
		put: function(req, res){
			console.log("in goals put controller");
			console.log(req.query);
			console.log("*********");
			goalModel.put(req,res);
		}

	},
	emails:{
		get: function(req,res){

			emailModel.get(req, res);

		},
		post:function(req,res){

			emailModel.post(req, res);
		}

	}


};