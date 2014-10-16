# Node JS

http://nodejs.org/



## 熟悉Common JS写法

### 最基本的写法
```
function pp(name){
	console.log('hello world 1:' + name);
}

module.exports = {
	hi:pp
};

```

```
function pp(name){
	console.log('hello world 2:' + name);
}

module.exports = pp
```


```
var obj = {
	pp: function(name){
		console.log('hello world 3:' + name);
	}
}

module.exports = obj
```

测试代码

```
/* test 1 */ 
var Hello = require('./helloworld')
Hello.hi('kezhizhi');

/* test 2 */ 
require('./helloworld_2')('kezhizhi')

/* test 3 */ 
var Hello = require('./helloworld_3')
Hello.pp('kezhizhi');
```


## 系统库

在mac下建议使用Dash查看nodejs文档


## 异步调用


### 异步示例
```
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
```


[更多](http://blog.csdn.net/yczz/article/details/7015463)

### 异步编程模式
see [q](https://github.com/kriskowal/q)

`node_asycn/q/index.js`

code

```
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
```


测试

```
node index.js
```


## 常用库

- fs
- utils

## 总结