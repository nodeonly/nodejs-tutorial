var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/',function(req,res){

	var name = req.body.name

	res.status(200).json({
		'name': name
	})
});

module.exports = router;
