var express = require('express');
var app = express();

app.get('/', function(req, res){  
    console.log(req.query.name,req.query.password);    
    res.send('name:'+req.query.name+'</br>password:'+req.query.password);    
});    
app.listen(3000);
console.log('Listening on port 3000');  


