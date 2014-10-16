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
	$('.login-btn').on('click',function(){
		var name = $('.get-name').val();
		var pwd = $('.get-pwd').val();
		$.post('http://localhost:3000/login',{name:name,password:pwd},function(data){
			if(data.status.code==0){
				alert('登录成功');
			}else{
				alert('登录失败');
			}
			//$('.get-name').val(data.data.name)
			console.log(data.data)
		})

	});
});
