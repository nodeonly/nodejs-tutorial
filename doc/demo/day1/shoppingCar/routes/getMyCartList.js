var express = require('express');
var router = express.Router();
var user = require('../dataModel/users');

router.post('/',function(req,res){
	var user_name = req.session.userName;
	cosole.log(user_name);
	user.storeCartsObj.find({'userName':user_name},function(err,arr){
		if(!arr.length){
			res.status(200).json({
				code:0,
				msg:[]
			});
		}else{
			
			
		};
	});
});



module.exports = router;