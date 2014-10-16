var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	if(req.session.name){
		console.log('yes');
	}else{
		console.log('no');
	};
 	res.send({
 		code:'0'
 	});
});

module.exports = router;
