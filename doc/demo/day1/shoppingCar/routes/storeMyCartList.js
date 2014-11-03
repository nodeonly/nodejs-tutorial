var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../dataModel/users');

router.post('/',function(req,res){
	var userName = req.session.userName;
	var postjson = req.body;
	var arr = postjson.storeId.split('&');
	for(var i=0; i<arr.length; i++){
		var storeObj = new user.storeCartsObj({
			userName:userName,
		    articlId:arr[i]
		});
		storeObj.save();
	};

	res.status(200).json({
		code:0
	});
});



module.exports = router;