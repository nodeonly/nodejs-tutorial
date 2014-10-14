var express = require('express');  
var bodyParser = require('body-parser');
var app = express();   

app.use(bodyParser());  

app.post('/', function(req, res) {  
    console.log(req.body.name);  
    console.log(req.body.password);  
    res.send('Post');
});  
  
post_mtd = function(req,res){  
  res.send('name');
}  

app.post("/test",post_mtd);
app.listen(3000);    
console.log('Listening on port 3000');  