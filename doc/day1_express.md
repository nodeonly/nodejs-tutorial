# Express

http://expressjs.com/

Express是一个简洁、灵活的基于nodejs的web应用开发框架，它是基于[connect](https://github.com/senchalabs/connect)中间件的。

它提供一系列强大的特性，勇于创建各种Web和移动设备应用。

## 为什么使用Express

- 基于node的异步，性能比较好
- Express本身比较成熟，目前已经是v4了
- 有很多大规模应用实例，集群等都非常容易

## 无状态的http协议


HTTP协议（HyperText Transfer Protocol，超文本传输协议）是用于从WWW服务器传输超文本到本地浏览器的传送协议。它可以使浏览器更加高效，使网络传输减少。它不仅保证计算机正确快速地传输超文本文档，还确定传输文档中的哪一部分，以及哪部分内容首先显示(如文本先于图形)等。
HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。


大家都明白，Web应用抽象起来就是客户端发出请求，请求到达服务器后，服务器经过一番捣鼓，给客户端发回一个应答。“请求”我们一般抽象成 request，“应答”是 response。服务器和客户端（一般也就是浏览器啦，但是绝不局限于浏览器哦。）之间交流的语言就是 HTTP 协议了。至于服务器怎么折腾出一个应答来的，就八仙过海，各显神通了。

总之，Web 应用中两个重量级的东东就是： Request ， Response 。

前面我们说到，每次有访问进来，我们的代码都会跑一遍。现在的问题是，在我们的代码里，怎么抓到客户端发来的 request , 然后，到哪里去找这个 response ，好把我们捣鼓出来的东西放进去，发给客户端呢？答案是，只要我们把他们作为参数交给 tellme 函数(你可以给这个函数取任何名字甚至不给他名字)，然后，当请求到达时，node.js 就会把客户的请求封装成 request ，预备发给客户的应答封装成 response 。我们拿到 request ，看看他请求些什么，再折腾些东西（读出个文件也好，去查数据库也好，随便你了。）丢进 response ，发给客户端。

TODO: 此处该补出一张express在node中得位置图片

![Mou icon](./images/expressimg9.jpg)


## Node 基础

see [node 基础](https://github.com/nodeonly/nodejs-tutorial/blob/master/doc/day3_node.md)

## Write a http server
### use Nodejs

```
var http = require('http');
 
http.createServer(function(request,response){
    console.log(request);
    response.end('Hello world!');
}).listen(8888);
```

这就是最简单的实现

### use Node connect

Connect is an extensible HTTP server framework for node using "plugins" known as middleware.

```
var connect = require('connect')
var http = require('http')

var app = connect()

// gzip/deflate outgoing responses
var compression = require('compression')
app.use(compression())

// store session state in browser cookie
var cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
})

//create node.js http server and listen on port
http.createServer(app).listen(3000)
```

这是官方给出的例子

## 安装Express

- 如何手动安装
- 如何使用generator

### 如何手动安装

新建文件夹:

	$ mkdir /getting start/app
	$ npm init
	
![Mou icon](./images/expressimg7.jpg)

cd到app下,运行:

	$sudo npm install --save express
	
将express安装在此目录下,新建app.js文件:

	var express = require('express');
	var app = express();

	app.get('/',function(req,res){
    	res.send('hello,world');
	});

	app.listen(5000);
	
终端运行:

	$node app.js
	
开启端口，浏览器访问localhost:5000，输出:

![Mou icon](./images/expressimg8.jpg)


### 如何使用generator

#### 安装

generator是express命令工具集，首先确保已经安装node和npm,先在全局安装这个工具集:
	
	$npm install -g express-generator
	
如果安装失败，尝试加sudo权限:

	$sudo npm install -g express-generator
	
现在新建一个我们的express应用,执行:

	$express expressApp
	
项目创建完毕，文件结构如下:

![Mou icon](./images/expressimg1.jpg)

#### express命令以及参数说明

TODO:by kezhi

#### 安装依赖

打开package.json，可以看到依赖的模块，执行命令来下载依赖的模块:

	$npm install
	
如果下载依赖失败，尝试加sudo权限:

	$sudo npm install
	
下载依赖模块成功后，可以看到在node_modules文件夹下多出了这些模块:

![Mou icon](./images/expressimg2.jpg)

#### 启动服务器

回到app.js层级，执行:

	$npm start

开始运行express打开端口，用浏览器打开http://localhost:3000/，在此估计会出现缺少模块的情况，如果有模块缺少，cd到node_modules文件夹下去安装缺失的模块:

	$sudo npm install xxx(模块名称)

大概会缺失5个模块左右，模块全部安装完成，浏览器则会输出:

![Mou icon](./images/expressimg3.jpg)

完毕,说明express安装成功.

## 核心概念


### 请求request

Request对象是有关于客户端所发出的请求的对象，只要是有关于客户端请求的信息，都可以藉由它来取得，例如请求标头、请求方法、请求参数、客户端IP，客户端浏览器等等信息。

客户端发来的请求，node.js 帮我们封装成 request 对象

在request里面我们可以获得

- body
- header
- params
- query
- ....

### 响应response

Response对象是有关于对客户端请求之响应，可以利用它来设定一些要响应的讯息，例如标题信息、响应状态码等.

我们利用response,向客户端发送回答，说白了是向浏览器写内容。

### 理解路由

所谓路由就是定义

- 地址1：谁来处理,以什么方式处理
- 地址2：谁来处理,以什么方式处理

```
	var express = require('express');
	var app = express();

	app.get('/',function(req,res){
    	res.send('hello,world');
	});
	
	app.post('/someur',function(req,res){
    	res.send('hello,world');
	});

	app.listen(5000);
```
	
说明一下
例如定义两个路由，一个对应get请求，一个对应post请求；当客户端向http://localhost:5000/发送get请求的时候，则会触发:

```
app.get('/',function(req,res){
    res.send('hello,world');
});
```
当客户端向http://localhost:5000/someur发送post请求的时候，则会触发:

```
app.post('/someur',function(req,res){
    res.send('hello,world');
});
```

### session

一个session就是一系列某用户和服务器间的通讯。服务器有能力分辨出不同的用户。

一个session的建立是从一个用户向服务器发第一个请求开始，而以用户显式结束或session超时为结束。
其工作原理是这样的：

1. 当一个用户向服务器发送第一个请求时，服务器为其建立一个session，并为此session创建一个标识号
2. 这个用户随后的所有请求都应包括这个标识号。服务器会校对这个标识号以判断请求属于哪个session
3. 当用户在一段时间没有任何操作，session就会自动超时

这种机制不使用IP作为标识，是因为很多机器是通过代理服务器方式上网，没法区分每一台机器。

对于session标识号（sessionID），有两种方式实现：cookies和URL重写，此处不详细讲解。

#### express的session

nodejs本身不管session，因为用了express框架，express基于connect，connect中有session管理的能力。connect是插件式架构，它的插件称之为“中间件”，其中有个中间件就是叫作session。

到了4.xx版本之后，session管理和cookies等许多模块都不再直接包含在express中，而是需要单独下载添加。


https://github.com/expressjs/session

#### 应用场景: 登陆

- 在登陆页面完成用户鉴权，鉴权成功后，在session里存储用户信息
- 一段时间没有任何操作，session就会自动超时，此时用户点击页面的时候，后台会判断是否存在当前用户的session
- 一半超时会重定向到登陆界面，提示此操作需要用户登陆

#### 应用场景: 购物车

- 保证当前session里有用户信息，用户是登陆状态的
- 用户在购物页面操作，点击加入购物车，此时在session里增加一条信息，存储当前物品信息
- 用户结算的时候，从session获取物品价格和数量，计算出总价，订单完成后，清理session

### 理解模板

- 常用模板有jade，ejs，handlebars以及artTemplate等
- 在express里如何用生成器指定模板
- morgan说明

#### jade node模板引擎

- http://jade-lang.com/

此引擎构建在node之上，需要经过node编译成html代码，例如:

```
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```
开启express服务，指定模板路径为views，模板引擎为jade，当客户端访问指定路由时，express便会去给对应的jade文件配置参数，并编译此jade模板:

```
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
```

index jade模板:

```
extends layout

block content
  h1= title
  p Welcome to #{title}
```
最终在客户端输出:

![Mou icon](./images/expressimg3.jpg)


### 理解public目录

- 常规做法

app.js里

	app.use(express.static(path.join(__dirname, 'public')));
	
它就是用来托管public中得所有文件。可以以http方式访问

#### 如果public/index.html不存在

此时如何使用其他页面做为入口，需要再`/`路由定义处，redirect到对应页面(by kezhi)。

#### 如何在静态页面处理请求参数

在静态页面处理请求参数，是通过连接地址把参数传递过去，通过前端jacascript取出做处理(by kezhi)。


#### 理解express.static

说明http-server用法

区分express.static和http-server的差别：功能一样，用法上有差异

#### 路由冲突

当`public/index.html`和路由的`/`冲突

此时按照`public/index.html`走

### HTTP

请查看[HTTP](https://github.com/nodeonly/nodejs-tutorial/blob/master/doc/demo/day1/http/readme.md)

### 理解connect中间件
#### 什么是Middleware？

从实现上看，Middleware和Route Handler一样，本质上都是函数。Middleware这个函数接受express传入3个参数：req，res和next。调用的方法就是app.use(function(req,res,next){....});
从处理过程上来看，middleware是处在请求Request和最终处理请求的Route Handler之间的一系列函数，它对于请求的内容在交由Route Handler之前做预先的处理。例如下面在请求到达route handler处理之前，经由Middleware的处理将请求的方法和地址打印在console中。

```
var app = express();

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.get('/', function(req, res, next) {
  res.send('Hello World!');
});

app.get('/help', function(req, res, next) {
  res.send('Nope.. nothing to see here');
});
```

当然这只是一个非常简单的例子，实际上express提供的Middleware可以实现非常强大的处理功能，例如对于session的管理等等。在具体自己动手写一个Middleware之前，不妨先去找找已经成熟的Middleware，毕竟express的社区是非常活跃的。

Middleware的参数

```
res, req
```

req和res分别代表请求和响应的对象的直接引用，这个概念非常重要，但是暂时且放在一边，先来看第3个参数next。

```
Next()
```

当调用next的时候，express将执行下一个Middleware。为什么不能像一般的js函数一样执行完毕就进入下一个Middleware，而要经由next来实现呢？
这是因为Middleware中有可能会执行异步的操作（例如对数据库的读写等等），所以并非到达函数底部就代表Middleware执行的完成，而应该将异步的操作完成才视作整个Middleware处理的完成。由于express并不知道操作何时算是完成，因此必须等到next函数被显性的呼叫之后，才会进入下一个Middleware的处理。
如果忘记调用next()，则会导致请求无法继续进行处理的错误。（当然，如果执行res.end又是另当别论的事情了）
#### Middleware使用中容易出现的错误

1、Middleware的顺序非常重要。
Middleware是按照顺序调用，因此如果调用的顺序不当很可能出现错误。另外如果将Route handler与Middleware混用，会导致在middleware之上部分的route不会执行这个middleware的内容。例如下面的代码中，向根节点的get请求就不会经由Middleware进行处理。

```
app.get('/', function(req, res) { res.send('hello'); });

app.use(function(req, res, next) {
  next();
});

app.post('/', function(req, res) { res.send('bye'); });
```

另一个更为常见的例子是static file server这个Middleware，因为我们无法为每一个资源文件，例如js，css写单独的routing，这个Middleware可以实现到指定的文件夹下寻找对应的文件，一旦找到对应的文件则会返回这个文件。如果将这个操作放在所有session处理的Middleware之前，则返回的文件不会请求新的session，可能会导致cookie设置不上。因此习惯性的将这个Middleware放在所有的Middleware之后使用。

2、忘记调用Next()

3、Req和Res都是对对象的直接引用。任何添加、删除、覆盖的操作都会因为它们是对对象的引用而反映到下一个Middleware以及之后route handler中。


#### 中间件写法
```
module.exports = function(root, options) {
  options = options || {}
  return function(req, res, next) {
    var filepath = root + req.pathname;
    send(filepath, function(err) {
       if (err) next(err)
    });
  }
}
```

## 任务

此处开始是大家每个人都必须亲手做的练习

1. 准备工作
1. 路由定制方式
1. 如何处理get请求
1. 如何处理post请求
1. 如何实现文件上传
1. request里如何取值
1. response返回
1. 完成api返回
1. 完成登陆
1. 完成购物车

### 准备工作

安装supervisor(by kezhi)


### 路由定制方式
路由定制方式有2种

- 常规做法
- 使用路由重定向

#### 常规定义路由

	var express = require('express');
	var app = express();

	app.get('/',function(req,res){
    	res.send('hello,world');
	});
	
	app.post('/someur',function(req,res){
    	res.send('hello,world');
	});

	app.listen(5000);
	
定义了2个请求

- /
- /someurl


#### 使用路由重定向

in app.js

```
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);
```

然后in `/routes/index.js`里

```
var express = require('express');
var router = express.Router();

router.get('/get', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/posttapi', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

此时的router里可以增加各种请求的方法。

这种写法是模块化写法，可以按照业务或者其他分类组织代码，使代码具有更高的可读性。

### 如何处理get请求

我们可以在一个html文件里向端口发送get请求，首先要在访问http://localhost:3000下，端口能向浏览器输出此html，默认情况下，express是会输出pubblic文件夹下的index.html文件，在没有特别指明的情况下，所以注释掉:

	app.use('/', routes);
	
这样在get请求的url为'/'时，express会找到pubblic文件夹;我们可以自定义路由:

	//自定义路由
	var myHttpGet = require('./routes/getserver');
	app.use('/getserver', myHttpGet);
	
当get请求的url为/getserver时，express会执行myHttpGet模块，在routes文件夹下实现myHttpGet模块:

	var express = require('express');
	var router = express.Router();

	/* GET http.*/
	router.get('/', function(req, res) {
		res.send(req.query);
	});

	module.exports = router;
	
当我们在html里用ajax向此路由发送get请求时，我们可以取到参数，做一些处理后，用:

	res.send(resJson);
	
返回给ajax对象:

	oGetBtn.onclick = function(){	

		 $.ajax({
	         type: "GET",
	         url: "http://localhost:3000/getserver",
	         data: {
	         	'method':'GET',
	         	'name':'rainBow',
	         	'sex':'man'
	         },
	         dataType: "json",
	         success: function(data){
	            var str = JSON.stringify(data);
				oResBox.innerHTML = str;
	          }
	     });
	};
		
点击GET按钮发送GET请求，并把发出去的参数整理成json格式并返回:

![Mou icon](./images/expressimg4.jpg)
	

### 如何处理post请求

在myHttpGet模块里添加接收此路由下得post请求代码,对于post请求，用req.body接收post参数:

	/* POST http.*/
	router.post('/', function(req, res) {
		res.send(req.body);
	});
	

点击按钮post发送post请求:

	$.ajax({
	     type: "POST",
	     url: "http://localhost:3000/getserver",
	     data: {
	     	'method':'POST',
	     	'name':'rainBow',
	     	'sex':'man'
	     },
	     dataType: "json",
	     success: function(data){
	        var str = JSON.stringify(data);
			oResBox.innerHTML = str;
	      }
	 });
	         
![Mou icon](./images/expressimg5.jpg)

更多，带有参数的post请求

	router.post('/post/:id', function(req, res) {
		res.status(200).json({
			data:{
				id:req.param('id'),
				name:'sss',
				kkk:req.body.kkk
			}
		})
	});

### 如何实现文件上传

什么是多部请求？

	var app = express();
	var multer  = require('multer')

	app.use(multer({ 
		dest: './uploads/',
	  rename: function (fieldname, filename) {
	    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
	  }
	}))
	
在路由里

	router.post('/post/formdata', function(req, res) {
	  // res.send('respond with a resource');
		console.log(req.body, req.files);
		console.log(req.files.pic.path);
		res.json(req.body);
	});

这里的req.files就可以渠道对应的files的详情，该放到db或者云存储就大胆的存储


### request里如何取值

- body
- params
- query

各自举例

body处理post请求参数，把参数整理成json各式:

	router.post('/', function(req, res) {
		res.send(req.body);
	});
	
query处理get请求参数，整理成json各式:

	router.get('/www:soso', function(req, res) {
		res.send(req.query);
	});

### response返回

- text
- xml
- json

### 完成api返回

### 完成登陆

### 完成购物车


## 实践积累

试着说明package.json的众多方面

 
#### package.json

package.json是描述项目文件，描述项目所依赖的模块，当我们把一个项目发布到npm时，其实不用把我们所依赖的模块一起发不上去，只需要把依赖的模块名称填写到package.json里面，当别人npm install的时候，npm会去识别package.json中所依赖的模块名称，然后下载下来:

- `npm install --save`  vs `npm install --save-dev`
- `npm start` vs `npm test` (scripts自定义)
- 如何写一个npm，以及发布

当我们通过npm安装某一模块时，运用`npm install --save`或者`npm install --save-dev`，npm则会把我们的项目依赖信息写入package.json中。


`npm install --save`  和 `npm install --save-dev`的区别:

devDependencies下列出的模块，是我们开发时用的，比如grunt-contrib-uglify，我们用它混淆js文件，它们不会被部署到生产环境。dependencies下的模块，则是我们生产环境中需要的依赖。
 
#### npm参数说明

npm install --save  和 npm install --save-dev的区别:

说明

- save会自动保存到package.json里
- save-dev会保存到devDependencies模块下，save会保存到dependencies

devDependencies下列出的模块，是我们开发时用的，比如grunt-contrib-uglify，我们用它混淆js文件，它们不会被部署到生产环境。dependencies下的模块，则是我们生产环境中需要的依赖。

#### npm start

新建项目npmStart:

![Mou icon](./images/npmstart.png)

配置package.json中得script参数:

```
{
  "name": "example1",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node http.js"
  }
}
```
cd到此目录，运行:

```
$npm start
```
即可运行http.js文件，这就相当于是node http.js的快捷运行方式。

#### npm发布模块

如果需要向npm发布自己的模块，那么需要注册账号密码，终端运行:

```
$npm adduser
```
按照提示填写账号密码邮箱，新建项目，配置package.json文件:

```
{
  "name": "hellonpm",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": false,
  "dependencies": {
    "express": "2.5.9",
    "ejs":"0.4.2",
    "superagent":"0.3.0"
  }
}
```
name即为我们的模块名称，要注意的是private必须设置为false，模块才能被发布，dependencies是指我们的模块需要依赖哪些其他的模块,cd到express文件夹下:

![Mou icon](./images/npm.jpg)

终端运行:

```
$npm publish
```

![Mou icon](./images/npm2.jpg)

模块发布成功！

cd到任意文件夹运行:

```
$npm install hellonpm
```
即可安装我们上传的hellonpm模块！


## 测试

```
npm install --save-dev mocha
npm install --save-dev chai
npm install --save-dev sinon
npm install --save-dev supertest
npm install --save-dev zombie
```


see [node 测试](https://github.com/nodeonly/nodejs-tutorial/blob/master/doc/day5_test.md)

## 调试

### node debug

V8 提供了一个强大的调试器，可以通过 TCP 协议从外部访问。Nodejs提供了一个内建调试器来帮助开发者调试应用程序。想要开启调试器我们需要在代码中加入debugger标签，当Nodejs执行到debugger标签时会自动暂停（debugger标签相当于在代码中开启一个断点）。代码如下：

see `demo/day1/debug/app_debug1.js`

	var express = require('express');
	var app = express();

	app.get('/',function(req,res){
		debugger;	
	  res.send('hello,world');
	});


	app.listen(5005);

	module.exports = app;


执行命令：`node debug app_debug1.js` 就可以进入调试模式。

当然，首先需要在程序代码中手动添加中断debugger; ， 这样当以调试模式运行时，程序会自动中断，然后等候你调试，就像GDB一样，可以用help命令查看自己都可以使用哪些调试命令。

```
debug> help
Commands: run (r), cont (c), next (n), step (s), out (o), backtrace (bt), setBreakpoint (sb), clearBreakpoint (cb),
watch, unwatch, watchers, repl, restart, kill, list, scripts, breakOnException, breakpoints, version
```

这里就和gdb等调试器一模一样了

注意,如果出现

	< Failed to open socket on port 5858, waiting 1000 ms before retrying
	
请结束掉所有debug进程

	ps -ef|grep debug-brk|awk '{print $2}'|xargs kill -9

### node-inspector

上面这种方式稍微有些麻烦，我们写JS代码调试的时候一般都用FireBug或谷歌浏览器内置的调试工具，nodejs程序当然也可以这样子来调试，但是首先需要安装一个node-inspector的东西

node-inspector是通过websocket方式来转向debug输入输出的。因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口。


这个需要用npm来安装，只需要执行下列语句：

	npm install -g node-inspector
	
安装完成之后，通常可以直接这样启动在后台：

	node-inspector &
	
默认会监听8080端口，当然，也可能通过使用--web-port参数来修改。然后，在执行node程序的时候，多加个参数：--debug-brk, 如下：

	node --debug-brk app.js
	
或者

	node-debug app.js

控制台会返回“debugger listening on port 5858”， 现在打开浏览嚣，访问http://localhost:8080，这时候就会打开一个很像Chrome内置调试工具的界面，并且代码断点在第一行，下面就可以使用这个来调试了。


![](./images/debug.png)

- 增加断点，查看调用栈，变量等
- 使用console打印查看日志

使用方法和chrome的inspect element调试web开发是一样的。

调试还是很方便的，而且可以异地调试。
  
## 部署实战

### 开发环境下

在开发环境使用 nodemon，supervisor 

### 产品环境下

在生产环境使用pm2，forever

- https://github.com/Unitech/PM2

#### PM2

Production process manager for Node.JS applications with a built-in load balancer.

Install PM2

```
npm install pm2 -g
```

Start an application

```
pm2 start app.js
pm2 start app.js -i max  # Enable load-balancer and cluster features
```

还有Monitoring dashboard呢，非常不错的样子

### 集群与负载

- nginx
- haproxy

## 压力测试
### ab

ab是apache自带的一个很好用的压力测试工具，当安装完apache的时候，就可以在bin下面找到ab

	ab -n1000 -c100 http://127.0.0.1:4100

### wrk

安装

```
git clone https://github.com/wg/wrk
cd wrk
make
sudo cp -rf wrk /bin/
```

测试

```
wrk -t8 -c400  http://127.0.0.1:4100
Running 10s test @ http://127.0.0.1:4100
  8 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    99.83ms   16.70ms 175.72ms   76.86%
    Req/Sec   325.50    161.75   665.00     50.27%
  22709 requests in 10.01s, 5.65MB read
  Socket errors: connect 155, read 3461, write 0, timeout 775
Requests/sec:   2267.99
Transfer/sec:    578.07KB
```

## 性能监控

利用 new relic 监控 node.js 的 express 项目
http://snoopyxdy.blog.163.com/blog/static/6011744020147279630820

## 阅读文档

### getting start

入门文档，如果你看完了上面的内容，就可以不要看了

### guide

此处是开发指南，建议完全看一遍

Error handling

监听server服务错误，如get请求的时候输出一个没定义的变量a，这时express捕捉到错误，并返回'Something broke!':

	app.get('/',function(req,res){
    	res.send(a);
	});

	app.use(function(err, req, res, next){
  		console.error(err.stack);
  		res.status(500).send('Something broke!');
	});

终端输出:

![Mou icon](./images/errhadding1.jpg)

浏览器返回:

![Mou icon](./images/errhadding2.jpg)

Debugging Express

Expressy已经内置了debug模块，如果要用debug运行app.js:

	$DEBUG=express:* node app.js
	
![Mou icon](./images/debug1.jpg)

### 知道如何查api文档

中文文档地址 

http://www.expressjs.com.cn

如何在mac下面使用Dash查看离线文档
## 更多

- connect
- express框架源码
- 反向代理（proxy，比如haproxy，nginx）
- 集群部署
- 可以把session存储到redis等缓存中

	```
	// 设置 Session
	app.use(session({
	  store: new RedisStore({
	    host: "127.0.0.1",
	    port: 6379,
	    db: "test_session"
	  }),
	  resave:false,
	  saveUninitialized:false,
	  secret: 'keyboard cat'
	}))
	```
- 理解什么是 Event Loop？http://www.ruanyifeng.com/blog/2013/10/event_loop.html
## 参考


- [Secure Your Node.js Webhooks with Middleware for Express](http://www.twilio.com/blog/2014/01/secure-your-nodejs-webhooks-with-middleware-for-express-middleware.html)
- [node-config](https://github.com/lorenwest/node-config)

## 总结