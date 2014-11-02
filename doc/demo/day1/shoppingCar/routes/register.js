var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:7000/mytest');
var db = mongoose.connection;
var kittySchema = mongoose.Schema({
    name: String,
    password:String
});
var Kitte = mongoose.model('user', kittySchema);

/* GET home page. */
router.post('/', function(req, res) {

	/*{
		'name':'xxx',
		'password':'xxx'
	}*/
	var getJson = req.body;
	if(){

	};
	/*var fluffy = new Kitte({ name: 'xiaolong' });
	fluffy.save();*/

});

module.exports = router;
