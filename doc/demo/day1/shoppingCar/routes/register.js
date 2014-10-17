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

/* GET home page. */
router.post('/', function(req, res) {
	var reqJson = req.body;

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
});

module.exports = router;
