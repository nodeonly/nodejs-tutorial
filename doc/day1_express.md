# Express

http://expressjs.com/

## 安装

- 如何安装
- 如何使用generator

generator是express命令工具集，首先确保已经安装node和npm,先在全局安装这个工具集:
	
	$npm install -g express-generator
	
如果安装失败，尝试加sudo权限:

	$sudo npm install -g express-generator
	
现在新建一个文件夹装我们的express应用:

	$mkdir expressApp
	
然后执行:

	$express expressApp
	
项目创建完毕，文件结构如下:

![Mou icon](./images/expressimg1.jpg)

打开package.json，可以看到依赖的模块，执行命令来下载依赖的模块:

	$npm install
	
如果下载依赖失败，尝试加sudo权限:

	$sudo npm install
	
下载依赖模块成功后，可以看到在node_modules文件夹下多出了这些模块:

![Mou icon](./images/expressimg2.jpg)

回到app.js层级，执行:

	$npm start
	
开始运行express打开端口，用浏览器打开http://localhost:3000/，在此估计会出现缺少模块的情况，如果有模块缺少，cd到node_modules文件夹下去安装缺失的模块:

	$sudo npm install xxx(模块名称)

大概会缺失5个模块左右，模块全部安装完成，浏览器则会输出:

![Mou icon](./images/expressimg3.jpg)

完毕,说明express安装成功.


## 阅读文档
### getting start

新建文件夹:

	$mkdir /getting start/app
	
![Mou icon](./images/expressimg7.jpg)

cd到app下,运行:

	$sudo npm install express
	
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

### guide

### 知道如何查api文档

## 核心概念

### 理解public目录

- 常规做法
- 如何在静态页面处理请求参数

理解express.static和http-server的差别

### 理解模板jade
- http://jade-lang.com/

还有handlebars

以及如何用生成器指定模板

### 理解路由

- 常规做法
- 使用路由重定向


### 请求request

### 响应response

### session

## 任务

### 了解http协议

### 如何处理get请求

我们可以在一个html文件里向端口发送get请求，首先要在访问http://localhost:3000下，端口能向浏览器输出此html，默认情况下，express是会输出pubblic文件夹下的index.html文件，在没有特别指明的情况下，所以注释掉:

	//app.use('/', routes);
	
这样在get请求的url为'/'时，express会找到pubblic文件夹;我们可以自定义路由:

	//自定义路由
	var myHttpGet = require('./routes/getserver');
	app.use('/getserver', myHttpGet);
	
当get请求的url为/getserver时，express会执行myHttpGet模块，在routes文件夹下实现myHttpGet模块:

	var express = require('express');
	var router = express.Router();

	/* GET http.*/
	router.get('/', function(req, res) {
		var sUrl = req.url;
		var arr = sUrl.split('?');
		var arrReq = arr[1].split('&');
		var resJson = {};

		for(var i=0; i<arrReq.length; i++){
			//['xx=xx','xx=xx']
			var newarr = arrReq[i].split('=');
			var attr = newarr[0];
			var value = newarr[1];
			resJson[attr] = value;
		};
		res.send(resJson);
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

### 如何实现文件上传

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

## 实践积累

试着说明package.json的众多方面

- `npm install --save`  vs `npm install --save-dev`
- `npm start` vs `npm test` (scripts自定义)
- 如何写一个npm，以及发布


## 总结


