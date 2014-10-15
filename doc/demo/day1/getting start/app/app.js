var oDebug = require('debug');
var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send(a);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000);


