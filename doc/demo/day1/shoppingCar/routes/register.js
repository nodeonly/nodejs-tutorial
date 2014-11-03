var express = require('express');
var router = express.Router();
//var user = require('../dataModel/users');

var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
    name: String,
    password:String
});
var userObj = mongoose.model('user', kittySchema);
/* GET home page. */
router.post('/', function(req, res) {

	var getJson = req.body;

	userObj.find({name:getJson.name},function(err,arr){
		if(arr.length){
			//已经注册
			res.status(200).json({
				"code":1,
				"msg":"用户名已存在"
			});
		}else{
			var userData = new userObj({name:getJson.name,password:getJson.password});
			userData.save(function(err,data){
				if(err){
					res.status(200).json({
						"code":3,
						"msg":"系统内部异常"
					});
				}else{
					res.status(200).json({
						"code":0,
						"msg":"注册成功"
					});
				};
			});
		};
	});

});

module.exports = router;
