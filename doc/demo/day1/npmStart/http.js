var http = require('http');
 
http.createServer(function(request,response){
    console.log(request);
	// console.log(request.url);
	// console.log(request.headers['user-agent']);
    response.end('Hello world!');
}).listen(8888);