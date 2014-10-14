---
layout: post
title: "测试MongoDB"
description: ""
keywords: ""
category: 
tags: []
---


# MongoDB

## WARNING: soft rlimits too low” in MongoDB with Mac OS X

[source](http://www.cnblogs.com/wbb2109/p/3991721.html)

If you get this warning when you connect to mongo shell in Mac OX X:

** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
A simple way to fix this is setting the limit just before starting mongod with this:

	ulimit -n 1024 && mongod
	
Or this:

	launchctl limit maxfiles 1024 1024
	
But if you are running mongo in a development environment this shouldn’t be a problem, you can just ignore it.

This is a temporary and not very pretty fix. To make this permanent you have to add this to the/etc/launchd.conf file:

	launchctl limit maxfiles 1024 1024
	
Now reboot to make changes effective.

You can see the actual values of the limits running this:

	$ launchctl limit maxfiles
	        maxfiles    1024           1024

Remember to restart your mongod process every time you change any value to see if it works.



## url

http://i5ting.com/2014/04/start-a-new-nodejs-the-right-way/



http://mongoosejs.com/docs/index.html



## 自动reload代码：supervisor

安装

	npm install --save supervisor
	
修改package.js

  "scripts": {
    "start": "./node_modules/.bin/supervisor ./bin/www"
  }
	
然后

	npm start
	
	
## 打印错误栈信息: stackman

He is like Batman, but for Node.js stack traces

https://github.com/watson/stackman




http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4#route-middleware



## 基础


## node express


## db


### 模型验证

Object schema description language and validator for JavaScript objects.

https://github.com/hapijs/joi



## awesome practice

### 使用precommit-hook，在提交之前进行单元测试

```
➜  redis-scheduler git:(master) ✗ git commit -am 'init'
validate: n/a (no script found)
running pre-commit checks...
running lint: ok
running test: ok
[master ce33f5e] init
 3 files changed, 257 insertions(+), 3 deletions(-)
 create mode 100644 prototype.js
 create mode 100644 redis.conf
```


### 使用msgpack序列化

A space-efficient object serialization library for NodeJS

https://github.com/pgriess/node-msgpack


```
  var msgpack = require('msgpack');

  var o = {"a" : 1, "b" : 2, "c" : [1, 2, 3]};
  var b = msgpack.pack(o);
  var oo = msgpack.unpack(b);
```


### 发送http请求

https://github.com/mikeal/request


## url
http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4#route-middleware



http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/


http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/