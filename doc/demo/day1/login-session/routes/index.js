var express = require('express');
var router = express.Router();
var model = require('../models/schema');

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', function(req, res) {
	if (req.session.user) {
      res.render('index', { title: 'Express' });
  } else {
      res.redirect('/login.html');
  }
	
});

router.get('/register',function(req,res){
	res.redirect('register.html');
})

router.post('/login.do',function(req,res){
	/*model.Kitten.find({ username: req.body.name,password:req.body.password},function (err, result) {
		if (err) return console.error(err);
		console.log(result)
		res.status(200).json({
			data:result,
			status:{
				code : 0,
				msg  : 'success!'
			}
		});
	});*/

	var user = {
		username:req.body['username'],
		password:req.body['password']
	};
	model.User.find(user,function(err,result){
		if(!err){
			if(result!=''){
				console.log(result);
				//return res.redirect('/');
				res.status(200).json({
					data:result,
					status:{
						code:0,
						msg:'success'
					}
				});
				req.session.user = user;
			} else{
				console.log('用户名或密码不正确');
				res.send({
					"status": {
						"code": 0,
						"message": "用户名或密码不正确"
					},
					"data": {}
				});
			}

		}else{
			console.log("faild");
		}
	})
});

router.post('/register.do',function(req,res){
	var user = new model.User({
		username:req.body['username'],
		password:req.body['password']
	});
	model.User.find(user.username,function(err,result){
		if(result){
			console.log('用户已存在');
			res.send({
				"status": {
					"code": 0,
					"message": "用户已存在"
				},
				"data": {}
			});
		}
		user.save(function (err, user) {
			if(!err) {
				if(!user);
				//			res.redirect('/')
				res.status(200).json({
					data:{
						user_id:user._id
					},
					status:{
						code:0,
						msg:'success'
					}
				});
			}
			console.log(user);
		});




	})
	

}) ;


router.get('/logout.do',function(req,res){
	req.session.user = undefined;	
	res.redirect('/')
})  

module.exports = router;
