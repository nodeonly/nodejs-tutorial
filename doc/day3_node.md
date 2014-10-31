# Node JS

http://nodejs.org/

Node.js是极其流行的，且毫无疑问你可以用它可以做任何你见过的不可思议的工作。由于很多新鲜东西，所以入门会比较复杂一些：Node.js是灵活，强大的工具，它可以用于构建很多不同类型的项目，从服务器端应用到网站，到工具，几乎无所不能。当然，它还只是一个迅速串红的新兴的工具，同样一件事儿可以有非常多的办法去做，很难去说会用到什么工具或者流程。

## 安装

下载地址： http://nodejs.org/download/

如果懒就使用installer方式，如果想自定义安装就下载source，自己编译。（推荐后者）


如果还搞不定，请参阅 http://www.bearfruit.org/2013/06/19/how-to-install-node-js-successfully/

## 工具

### nvm

Node Version Manager - Simple bash script to manage multiple active node.js versions

用法见 https://github.com/creationix/nvm/

### nrm

NPM registry manager, fast switch between different registries: npm, cnpm, eu, au, sl, nj, pt

用法见 https://github.com/Pana/nrm

在国内，建议使用taobao或cnpm的源

	nrm use taobao | cnpm  

## 教程

官方推荐：http://nodeschool.io/

非常棒

....需要详细说说.....


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

## 参考

- [node-books](http://thepana.com/node-books/)
- [node.js中文社区](http://cnodejs.org/)
- [Node.js入门教程(E文)](http://nodebeginner.org/)
- [中文用户手册](http://cnodejs.org/cman/)
- [node.js API文档]( http://cnodejs.org/api/)
- [npm依赖管理工具(node 中的RubyGems)](  http://npmjs.org/)
- [Node Cloud(全面的node.js资料库)](http://www.nodecloud.org/)
