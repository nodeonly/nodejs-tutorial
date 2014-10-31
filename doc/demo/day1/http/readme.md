http://www.embeddedjs.com/


## Post with x-www-form-urlencoded
see post.html


```
	<script>
	$(function(){
		$.ajaxSetup({
		  contentType: "application/x-www-form-urlencoded; charset=utf-8"
		});
	
		$.post("/users/post", { name: "i5a6", time: "2pm" },
		   function(data){
		     console.log(data);
		   }, "json");
		 
	});
	</script>
```

in routes/users.js

```
	router.post('/post', function(req, res) {
	  // res.send('respond with a resource');
		res.json(req.body);
	});
```

## Post with form-data


	npm install --save multer


Usage

```
var express = require('express')
var multer  = require('multer')

var app = express()
app.use(multer({ dest: './uploads/'}))
```

You can access the fields and files in the request object:

```
console.log(req.body)
console.log(req.files)
```

IMPORTANT: Multer will not process any form which is not multipart/form-data

[see more](https://github.com/expressjs/multer)



## Post with raw




## node express 

As part of the 3.x -> 4.x changes, the middleware for processing multipart/form-data request body data was removed from the bodyParser middleware, so it only parses application/x-www-form-urlencoded and application/json request body data.

If you want to use multipart/form-data as the request body, you need to use the multer middleware.