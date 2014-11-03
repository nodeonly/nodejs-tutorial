var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userObj = mongoose.model('user');

/* GET home page. */
router.post('/', function(req, res) {

	var reqJson = req.body;

	userObj.find({name:reqJson.name},function(err,arr){
		if(arr.length && arr[0].password == reqJson.password){
			//登陆成功
			req.session.userName = reqJson.name;
			res.status(200).json({
				code:0,
				msg:{
					name:reqJson.name
				}
			});
		}else{
			res.status(200).json({
				code:1,
				msg:"用户名或密码错误"
			});
		};
	});
});

module.exports = router;
