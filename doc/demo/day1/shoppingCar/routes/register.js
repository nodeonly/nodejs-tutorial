var express = require('express');
var router = express.Router();
<<<<<<< HEAD
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
>>>>>>> 88bde3a1c7f02d2e44171c6bfaa2a5b86e878451

/* GET home page. */
router.post('/', function(req, res) {
	var reqJson = req.body;
<<<<<<< HEAD
	req.session.name = reqJson.name; 
 	res.send({
 		code:0
 	});
=======

	/*{
		'name':'xxx',
		'password':'xxx'
	}*/


	//判断是否已经注册
	if(findJson(userArr,reqJson.name)){
		res.send({
	 		code:1,
	 		msg:{
	 			detail:'此用户已经注册'
	 		}
	 	});
	 	
	}else{
		userArr.push({
			'name':reqJson.name,
			'password':reqJson.password
		});
		
		res.send({
	 		code:0,
	 		msg:{
	 			detail:'注册成功'
	 		}
	 	});
	 	

	};
 	console.log(userArr);
>>>>>>> 88bde3a1c7f02d2e44171c6bfaa2a5b86e878451
});

module.exports = router;
