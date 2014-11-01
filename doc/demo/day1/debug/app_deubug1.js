var express = require('express');
var app = express();

app.get('/',function(req,res){
	debugger;	
  res.send('hello,world');
});


app.listen(5005);

module.exports = app;
