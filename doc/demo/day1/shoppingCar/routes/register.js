var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	var reqJson = req.body;
	req.session.name = reqJson.name; 
 	res.send({
 		code:0
 	});
});

module.exports = router;
