var express = require('express');

var app = express();

function findArr(arr,attr){
	for(var i=0; i<arr.length; i++){
		if(arr[i] == attr){
			return true;
		};
	};

	return false;
};

app.get('/',function(req,res){
	//console.log(req.is('json'));
	var arr = [];

	for(var attr in req){
		arr.push(attr);
	};
	console.log(arr);
	console.log(findArr(arr,'url'));
    res.json({});
    //res.sendFile('/absolute/path/to/IMG_0523.PNG');
    //console.log(req.ip);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000);


