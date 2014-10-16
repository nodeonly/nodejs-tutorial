var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/get', function(req, res) {
	res.status(200).json({
		data:{
			id:1,
			name:'sss'
		},
		status:{
			code: 0,
			msg : 'success'
		}
	});
	console.log(req.query)
});




/* GET home page. */
/*router.get('/', function(req, res) {
  	res.render('index', { title: 'ExpressTest' });
//	res.send(req.query);
	res.status(200).json({
		data:req.query,
		status:{
			code: 0,
			msg : 'success'
		}
	});
	console.log(req.query)
});*/

router.post('/post/:id', function(req, res) {
	res.status(200).json({
		data:{
			id:1,
			name:'kkk',
			number:req.body.number

		},
		status:{
			code: 0,
			msg : 'success'
		}
	})
});

module.exports = router;