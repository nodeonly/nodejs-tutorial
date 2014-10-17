var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
	//console.log(req.files);
	/*console.log(req.busboy);

	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        fstream = fs.createWriteStream(__dirname + '/../public/images/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
        	res.send('success');
        });
    });*/
});

module.exports = router;