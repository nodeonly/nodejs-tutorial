var express = require('express');
var router = express.Router();
<<<<<<< HEAD

/* GET home page. */
router.post('/', function(req, res) {
	if(req.session.name){
		console.log('yes');
	}else{
		console.log('no');
	};
 	res.send({
 		code:'0'
 	});
=======
var userArr = require('./userjson.js');

function findJson(arr,str){
	
	for(var i=0; i<arr.length; i++){
		if(arr[i].name == str){
			return true;
		};
	};

	return false;
};

function getJson(arr,attr){

	for(var i=0; i<arr.length; i++){
		var json = arr[i];

		if(json.name == attr){
			return arr[i]
		};
	};

	return null;
};

/* GET home page. */
router.post('/', function(req, res) {
	var reqJson = req.body;
	console.log(userArr);
	if(findJson(userArr,reqJson.name)){

		var userJson = getJson(userArr,reqJson.name);

		if(userJson.password == reqJson.password){
			res.send({
		 		code:0,
		 		msg:{
		 			detail:'登陆成功'
		 		}
		 	});

		}else{
			res.send({
		 		code:1,
		 		msg:{
		 			detail:'用户名或密码错误'
		 		}
		 	});
		};
	}else{
		res.send({
	 		code:1,
	 		msg:{
	 			detail:'用户名或密码错误'
	 		}
	 	});
	};
	console.log(userArr);
	//console.log(1);

>>>>>>> 88bde3a1c7f02d2e44171c6bfaa2a5b86e878451
});

module.exports = router;
