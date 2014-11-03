var express = require('express');
var router = express.Router();
///var user = require('../dataModel/users');

router.post('/',function(req,res){
	cosole.log(1);
	var user_name = req.session.userName;
	cosole.log(user_name);
	/*user.storeCartsObj.find({'userName':user_name},function(err,arr){
		
		//var newArr = reorganize(arr);
		cosole.log(arr);
		
	});*/
	res.status(200).json({
		code:0,
		msg:'kkdl'
	});
});

/*function reorganize(arr){
	var newarr = [];

	for(var i=0; i<arr.length; i++){
		if(findarr(newarr,arr[i].articlId)){
			var getcount = parseInt(arr[i].count);
			if(!getcount){
				getcount = 1;
			}else{
				getcount++;
			};
			setarr(newarr,arr[i].articlId,{
				count:getcount
			});
		}else{
			newarr.push(arr[i]);
		};
	};
};

function findarr(arr,n){
	for(var i=0; i<arr.length; i++){
		if(arr[i].articlId == n){
			return true;
		};
	};

	return false;
};

function setarr(arr,n,json){
	for(var i=0; i<arr.length; i++){
		if(arr[i].articlId == n){
			for(var attr in json){
				arr[i][attr] = json[attr]
			};
		};
	};
};*/

module.exports = router;