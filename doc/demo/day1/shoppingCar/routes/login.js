var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
 	res.send({
 		code:'0'
 	});
});

module.exports = router;
