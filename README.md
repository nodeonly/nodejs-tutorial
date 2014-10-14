nodejs-tutorial
===============


主要是用nodejs+mongodb构建api server

## Lession

MEAN

- day1: Express
- day2: Mongo DB
- day3: Node
- day4: Angualar


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