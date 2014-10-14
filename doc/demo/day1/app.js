var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});
app.set('title', 'My Site');
app.get('title');

app.listen(3000);


