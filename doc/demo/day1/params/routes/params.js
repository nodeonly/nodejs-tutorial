var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	//console.log(req.params);
  	res.send(req.params);
});

module.exports = router;