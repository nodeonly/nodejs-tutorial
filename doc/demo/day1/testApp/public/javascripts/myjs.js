$(function(){
	$('#get').on('click',function(){
		$.get('http://localhost:3000/get',function(data){
			$('.get-name').val(data.data.name)
			console.log(data.data.name)
		})

	});
	$('#post').on('click',function(){
		$.post('http://localhost:3000/post/id=1',{number:$('.post-id').val()},function(data){
			console.log(data.data)
		})

	});


	//登录
	$('.login-btn').on('click',function(){
		var username = $('#text03').val();
		var password = $('#text04').val();
		/*myDB.transaction(function(tx){
			tx.executeSql("select * from user where name='"+name+"'and password='"+password+"'",[],function(tx, result) {
				if(result.rows.length>0){
					alert('登录成功');
				}else{
					alert('登录失败');
				}
			},function(error){
				alert('登录失败');
			})
		})*/
		$.post('http://localhost:3000/login',{username:username,password:password},function(data){
			if(data.status.code==0){
				alert('登录成功');
			}else{
				alert('登录失败');
			}
			console.log(data.data)
		})

	})




/*	$('.login-btn').on('click',function(){
		var username = $('.get-name').val();
		var password = $('.get-pwd').val();
		$.post('http://localhost:3000/login',{username:username,password:password},function(data){
			if(data.status.code==0){
				alert('登录成功');
			}else{
				alert('登录失败');
			}
			//$('.get-name').val(data.data.name)
			console.log(data.data)
		})

	});*/
});
