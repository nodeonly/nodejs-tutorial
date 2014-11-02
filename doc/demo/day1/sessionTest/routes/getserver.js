var express = require('express');
var router = express.Router();

/* GET http.*/
router.get('/', function(req, res) {
	console.log(req.cookies);
	//console.log(res.req.sessionID);
	var se = req.session;
	var id = res.req.sessionID;
	if(se.count){
		se.count++;
		res.send({
			count:se.count,
			sessionID:id
		});
		res.status(200).end();
		
	}else{
		se.count = 1;
		res.send({
			count:se.count,
			sessionID:id
		});
		res.status(200).end();
		
	};
	
});

/* POST http.*/
router.post('/', function(req, res) {
	req.session.destroy();
	res.send(req.body);
	res.status(200).end();
});

module.exports = router;




