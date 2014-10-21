var express = require('express');
var router = express.Router();
var model = require('../models/schema');

/* GET users listing. */
router.get('/add', function(req, res) {
    var silence = new model.Kitten({ username: 'zhi.ke', password:'111'});
	console.log(silence.name);

	silence.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  res.status(200).json({
	  	data:fluffy
	  });
	});
});
router.get('/remove', function(req, res) {
	var id = {_id : '54463468b95a972609f8dc54'};
	model.Kitten.remove(id,function (err, result) {
		if(err){
			console.log(error);
		}else{
			res.status(200).json({
				data:'remove ok'
			});
		}
	})
});
router.get('/search', function(req, res) {
	model.Kitten.find({ username: /^zhi.ke/ },function (err, kitten) {
		if (err) return console.error(err);
		console.log(kitten)
		res.status(200).json({
			data:kitten,
			status: {
				"code": 0,
				"message": "Success"
			}
		});
	})

});
router.get('/update', function(req, res) {
	var id = {_id : '5446219692b8f8f605a53a53'};
	var update = {$set :{username : 'sang'}};
	model.Kitten.update(id,update,function (err, result) {
		if(err){
			console.log(error);
		}else{
			res.status(200).json({
				data:'update ok'
			});
		}
	})
});

module.exports = router;
