var fs = require('fs')

// 同步
var filenames = fs.readdirSync(".");
for (i = 0; i < filenames.length; i++) {
   console.log(filenames[i]);
}

console.log('Current uid: ' + process.getuid()+ "\n---------------------------");

//异步

fs.readdir(".", function (err, filenames) {
   var i;
   for (i = 0; i < filenames.length; i++) {
       console.log(filenames[i]);
   }
});

console.log('Current uid: ' + process.getuid() + "\n");