# 测试

http://www.scotchmedia.com/tutorials/express/authentication/2/02

http://www.agilemobiledeveloper.com/2012/08/30/test-driven-node-js-development/

在构建Node.js应用时，通常你会采用哪些工具进行测试呢？单元测试、BDD还是采用其他测试方法，比如框架和系统测试？

Node.js拥有一组令人惊奇的强大且成熟的测试工具。比如Node.js内置的[Assert](http://nodejs.org/api/assert.html)允许你进行一些基础的XUnit风格测试。NodeUnit是Node.js的的单元测试框架，基于断言模块，简单的语法，功能强大的工具。Nodeunit node.js和浏览器可提供简单的异步单元测试。

对于经常使用XUnit的开发人员来说，[NodeUnit](https://github.com/caolan/nodeunit)非常简单。

[Mocha](https://github.com/visionmedia/mocha)是一款完整的测试工具，可安装在NPM和CI服务器之上，这款工具非常棒。
Node.js测试工具（testing/bdd/mocking）源代码托管在GitHub上。在Cucumber中提供了行为驱动开发工具包括BDD测试工具[Cucumber.js](https://github.com/cucumber/cucumber-js)，还有Asynchronous BDD测试工具Vow。

mocking数据中Mockito Style Mock Objects–[Mary Jane](https://github.com/dhasenan/maryjane/)是个不错的选择。对于JQuery迷而言，已经有很多开发者从QUnit移植到Node.js（[Node-Qunit](https://github.com/kof/node-qunit)）开发平台。Node.js应用中[Virile](http://masylum.github.com/testosterone/)测试也是非常不错的，同样的还有Headless全栈测试[Zombie.js](http://zombie.labnotes.org/)。



## tdd

## bdd


## 场景

### db
### http

```js
var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

var Utils = require('../index');

console.log(Utils)

var request = require('supertest')
  , express = require('express');


describe('Utils.req', function(){
  describe('#get_value_from_body()', function(){
    it('should return Manny when get_value_from_body with key name', function(done){

			var app = express();
			
			app.post('/user', function(req, res){
				// mock req.body data
				req.body = { 'name': 'Manny', 'species': 'cat' };
				
				var Manny = Utils.req.get_value_from_body(req, 'name');
				assert.equal(Manny, 'Manny');
				
		 	 	var species = Utils.req.get_value_from_body(req, 'species');
				assert.equal(species, 'cat');
				
				done();
			});
			
			request(app)
			  .post('/user')
				.set('contentType', 'application/x-www-form-urlencoded; charset=utf-8')
			  .end(function(err, res){
					if (err) throw err;
			  });

    })
  })//end  
})
```

## 了解supertest

supertest是基于superagent的，它只是注入了app对象，以及expect便利。

### get

  Here's an example with mocha, note how you can pass `done` straight to any of the `.expect()` calls:

```js
describe('GET /users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
```


### post


```js
request(app)
.post('/')

```

### upload

  Anything you can do with superagent, you can do with supertest - for example multipart file uploads!

```js
request(app)
.post('/')
.attach('avatar', 'test/fixtures/homeboy.jpg')
...
```


### API

  You may use any [super-agent](http://github.com/visionmedia/superagent) methods,
  including `.write()`, `.pipe()` etc and perform assertions in the `.end()` callback
  for lower-level needs.

#### .expect(status[, fn])

  Assert response `status` code.

#### .expect(status, body[, fn])

  Assert response `status` code and `body`.

#### .expect(body[, fn])

  Assert response `body` text with a string, regular expression, or
  parsed body object.

#### .expect(field, value[, fn])

  Assert header `field` `value` with a string or regular expression.

#### .expect(function(res) {})

  Pass a custom assertion function. It'll be given the response object to check. If the response is ok, it should return falsy, most commonly by not returning anything. If the check fails, throw an error or return a truthy value like a string that'll be turned into an error. 

  Here the string or error throwing options are both demonstrated:

  ```js
  request(app)
    .get('/')
    .expect(hasPreviousAndNextKeys)
    .end(done);

  function hasPreviousAndNextKeys(res) {
    if (!('next' in res.body)) return "missing next key";
    if (!('prev' in res.body)) throw new Error("missing prev key");
  }
  ```

#### .end(fn)

  Perform the request and invoke `fn(err, res)`.

## superagent

supertest是基于superagent的，它只是注入了app对象，以及expect便利。但是supertest里没有说明get和post传参数方式以及http的高级用法，所以了解superagent是非常必要的。

- get方法
- post方法
- Plugins

### get

  The following is what you might typically do for a simple __GET__ with jQuery:

```js
$.get('/user/1', function(data, textStatus, xhr){

});
```

Great, it's ok, but it's kinda lame having 3 arguments just to access something on the `xhr`. Our equivalent would be:

```js
request.get('/user/1', function(res){

});
```

### post

An example of a JSON POST with jQuery typically might use `$.post()`, however once you need to start defining header fields you have to then re-write it using `$.ajax()`... so that might look like:

```js
$.ajax({
  url: '/api/pet',
  type: 'POST',
  data: { name: 'Manny', species: 'cat' },
  headers: { 'X-API-Key': 'foobar' }
}).success(function(res){

}).error(function(){

});
```

 Not only is it ugly, but it's pretty opinionated. jQuery likes to special-case {4,5}xx- for example, you cannot (easily at least) receive a parsed JSON response for say "400 Bad Request". This same request would look like this:

```js
request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function(error, res){

  });
```

### Plugins

Usage:

```js
var nocache = require('no-cache');
var request = require('superagent');
var prefix = require('superagent-prefix')('/static');

prefix(request); // Prefixes *all* requests

request
.get('/some-url')
.use(nocache) // Prevents caching of *only* this request
.end(function(res){
    // Do something
});
```

Existing plugins:
 * [superagent-no-cache](https://github.com/johntron/superagent-no-cache) - prevents caching by including Cache-Control header
 * [superagent-prefix](https://github.com/johntron/superagent-prefix) - prefixes absolute URLs (useful in test environment)

Please prefix your plugin component with `superagent-*`

For superagent extensions such as couchdb and oauth visit the [wiki](https://github.com/visionmedia/superagent/wiki).




## 另外的测试方法
see https://github.com/mcollina/generify/blob/master/package.json


  "test": "tape test.js | faucet"
	

## stdout mock

我们知道console.log是放到`process.stdout`里打印日志的方法，那么在单元测试里怎么测试呢？


这里给出一个机遇mocha的测试


思路很简单

- 通过captureStream方法来拦截stdout
- 通过captureStream#captured获取stdout内容

代码如下

```
var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

var console = require('../index');

function captureStream(stream){
  var oldWrite = stream.write;
  var buf = '';
  stream.write = function(chunk, encoding, callback){
    buf += chunk.toString(); // chunk is a String or Buffer
    oldWrite.apply(stream, arguments);
  }

  return {
    unhook: function unhook(){
     stream.write = oldWrite;
    },
    captured: function(){
      return buf;
    }
  };
}


describe('Console', function(){
	var hook;
	
  before(function() {
    // runs before all tests in this block
  })
  after(function(){
    // runs after all tests in this block
  })
  beforeEach(function(){
    // runs before each test in this block
		hook = captureStream(process.stdout);
  })
  afterEach(function(){
    // runs after each test in this block
		hook.unhook(); 
  })

  describe('#debug()', function(){
    it('should return a string when debug = true;', function(){
			console.debug = true;
			console.log("debug = true;");
          
			assert.equal(hook.captured(),'debug = true;\n');
    })
		
    it('should return empty string when debug = false;', function(){
			console.debug = false;
			console.log("debug = true;");
          
			assert.equal(hook.captured(),'');
    })
  })
})
```

