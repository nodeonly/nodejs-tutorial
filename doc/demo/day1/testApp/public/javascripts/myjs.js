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

	})
});
