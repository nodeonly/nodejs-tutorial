var Q = require('q')
var fs = require('fs')

require('colors');

var fsReadFile_deferd = function(file,encoding){
    var deferred = Q.defer();
	fs.readFile(file,encoding,function(error,result){
	    if(error){
	        deferred.reject(error.toString().red);
	     }
	     deferred.resolve(result);
	});

	return deferred.promise;
};

var file = '../test.js'
fsReadFile_deferd(file).then(function(result){
  console.log("invoke in deferd".red);
  console.log(result.toString().green);
},function(error){
  console.log("invoke in deferd".red);
  console.log(error.toString().red);
});