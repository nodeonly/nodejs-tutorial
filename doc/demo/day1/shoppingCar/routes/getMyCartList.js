var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var userCartsObj = mongoose.model('userCarts');
//var articlObj = mongoose.model('articlForm');

router.post('/',function(req,res){
	var user_name = req.session.userName;
	cosole.log(user_name);
	/*userCartsObj.find({'userName':user_name},function(err,arr){
		if(!arr.length){
			res.status(200).json({
				code:0,
				msg:[]
			});
		}else{
			
			
		};
	});*/
});



module.exports = router;