var express = require('express');
var router = express.Router();
var user = require('../dataModel/users');

router.post('/',function(req,res){
	user.articlObj.find(function(err,arr){
		if(err){
			res.status(200).json({
				code:1,
				msg:"服务器内部错误"
			});
		}else{
			res.status(200).json({
				code:0,
				msg:arr
			});
		};
	});
});

module.exports = router;