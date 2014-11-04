var express = require('express');
var router = express.Router();
var user = require('../dataModel/users');

router.post('/',function(req,res){
	var user_name = req.session.userName;
	var postjson = req.body;
	var arr = postjson.storeId.split('&');

	for(var i=0; i<arr.length; i++){
		
		var index_now = parseInt(arr[i]);

		(function(index){
			
			user.articlObj.find({articlId:index},function(err,arr){
				var this_cats_detail = arr[0];
				var storeObj = new user.storeCartsObj({
					userName:user_name,
				    articlId:index,
				    name:this_cats_detail.name,
				    price:this_cats_detail.price
				});

				console.log(storeObj);
				storeObj.save();
			});
		})(index_now);
	};

	res.status(200).json({
		code:0
	});
});



module.exports = router;