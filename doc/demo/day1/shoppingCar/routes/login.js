var express = require('express');
var router = express.Router();
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

});

module.exports = router;
