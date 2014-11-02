var express = require('express');
var router = express.Router();
var user = require('../dataModel/users');


/* GET home page. */
router.post('/', function(req, res) {

	/*{
		'name':'xxx',
		'password':'xxx'
	}*/
	var getJson = req.body;
	console.log(getJson);
	var userData = new user({name:getJson.name,password:getJson.password});
	userData.save();
	/*user.find({name:'xiaolong'},function(err,json){
		console.log('a');
	});*/
	/*var fluffy = new Kitte({ name: 'xiaolong' });
	fluffy.save();*/

});

module.exports = router;
