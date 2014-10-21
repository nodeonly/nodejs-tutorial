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

router.post("/login",function(req,res) {
	res.status(200).json({
		data:{
			name:'zhi.ke',
			password:'123'
		},
		status:{
			code: 0,
			msg : 'success'
		}
	});
	console.log(req.body);
	/*if(req.body.name=='kezhi'&&req.body.password=='111'){
		res.send('ok')
	}else{
		res.send('no');
	}
*/
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
			id:req.param('id'),
			name:'kkk',
			number:req.body.number

		},
		status:{
			code: 0,
			msg : 'success'
		}
	})
});


//router.post("/login", checkNotLogin);
/*router.post("/login",function(req,res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function(err, user) {
		if (!user) {
			req.flash('error', '用户不存在');
//			return res.redirect('/login');
		}

		if (user.password != password) {
			req.flash('error', '用户名或密码错误');
//			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', req.session.user.name + '登录成功');
//		res.redirect('/blog');
	});
});*/


module.exports = router;