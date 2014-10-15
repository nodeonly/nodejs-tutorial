var express = require('express');  
var bodyParser = require('body-parser');
var app = express();   

app.use(bodyParser());  

app.get('/', function(req, res){
    res.sendfile('views/index.html');
});

app.post('/', function(req, res){
    console.log(req.body.text);
    res.status(200).json({
    	'name':'ss'
    })

/*app.post(function(req, res){
  res.send('Hello');
});*/
    //res.status(200).text('111111111')
    //res.sendfile('views/index.html');
});

app.listen(3000);    
console.log('Listening on port 3000');  