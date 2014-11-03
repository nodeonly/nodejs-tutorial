# Mongo DB

http://www.mongodb.org/

## 安装部署

### 方式1

安装brew:
	
	$ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	
通过brew安装mongodb:

	$brew install mongodb
	
![Mou icon](./images/mongodb1.jpg)

安装成功:

![Mou icon](./images/mongodb2.jpg)

运行命令:

	$mongod --version
	
![Mou icon](./images/mongodb3.jpg)

不推荐

### 方式2

http://www.mongodb.org/downloads

下载最新的mongodb，比如mac目前最新的是mongodb-osx-x86_64-2.6.5.tgz

将下载的压缩包，解压到/Users/sang/bin/下面

配置环境变量，比如我的zsh配置到`~/.zshrc`里

	export PATH=/Users/sang/bin/mongodb-osx-x86_64-2.6.4/bin:$PATH
	
## 启动服务器

create  startmongo.sh

```
	#! /bin/bash
	mkdir -p ./data/mongodb
	mongod --dbpath ./data/mongodb  --logpath ./mongodb.log &
```

说明

- mongod是mongo deamon的意思，启动服务器
- `--dbpath`是数据存储位置
- `--logpath`是日志存储位置

执行

	./startmongo.sh
	
查看日志

	tail -f ./mongodb.log

## 熟悉命令

### 练习
在线练习

	http://try.mongodb.org/
	
本地

	➜  ~  mongo
	MongoDB shell version: 2.6.4
	connecting to: test
	Server has startup warnings: 
	2014-10-12T15:15:30.180+0800 [initandlisten] 
	2014-10-12T15:15:30.180+0800 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
	> 

### 连接 

打开命令窗口，键入mongo，如果系统提示：connecting to: test，表示连接成功。 

### 查看所有库 
键入show dbs,则会显示出当前数据库中所有的数据库名称。在mongodb里面是不用 
去手动建立一个数据库的，你只要直接使用就好，如果不存在数据库引擎会帮我们 
创建他们。这一点与传统数据库相比有些不同。 

### 使用mydb 
键入use mydb，使用数据库mydb，当然 
mongodb会帮助我们自动创建他们，当然这个时候数据库还是空的，可以通过输入 
show dbs来确认这一点。 

### 新增记录 

输入：

	db.user.save({name:'Rod',age:30})  


### 查看集合当中所有文档 

	db.user.find()

可查看出当前库user集合中所有的文档，如下所示：

	{ "_id" : ObjectId("4df2201ac905b4e2a5f555cb"), "name" : "Rod", "age" : 30 } 

此时发现，在文档的前面多了一列"_id"，这是自动加进去的，不用管他。 

### 删除记录 

db.user.remove()将删除所有记录，

	db.user.remove({name:'Rod'})
	
将删除指定记录 

### 保存多条记录 
输入：

	for(var i=1;i<=20;i++) db.user.save({x:8,y:i})  
	
，可以看出整个语法很像 
JS，其实你正在使用的就是一个JavaScript Shell。此时可以输入db.user.find() 
来查看所有记录。 

### 迭代器的使用 
我们再向集合中插入一条记录：

	db.user.save({x:'test'})
	
，再次查看所有记录 
	
	db.user.find()
	
则发现只显示出了前20条记录。此时可以输入it（iteraor）来 
查看余下的记录。 

在mongodb里可以将cursor当成数组来使用，如下所示： 

```
var cursor = db.user.find(); // 将游标缓存起来  
printjson(cursor[4]); // 打印出第5条记录  
```

注意此种方式会将前N行全查出来，所以对性能有较大影响。 

### 根据条件查询 
现要查询出y大于10的所有记录： 

	db.user.find({y:{$gt:10}});  


其中$gt的意思就是“大于”，当然读者可推出其他N种表达。 

### 查询指定列 

	db.user.find({x:8},{y:true});// 查询出x=8的所有记录的y列  
  db.user.find({},{y:true}); // 查询出所有的Y列  

### 只查第一列 
有的时候我们只需要第一行的值，如果自己编程实现显得有些麻烦，因此数据库为我们 
提供了一个方法：

	db.user.findOne(); 

### 限制最大记录从而提高性能 
我们可以通过limit来限制查询的最大行数，如下： 

	db.user.find().limit(4); // 只显示出前四条 

### 修改记录 

将第一条x为3的记录修改为后面的值，
	
	db.user.update({x:4},{x:4,y:1}); 

## 文档

增删改查crud

http://docs.mongodb.org/manual/core/crud-introduction/

 

## 了解node如何调用mongodb


## 了解mongoose（ORM）用法
http://mongoosejs.com/docs/

http://www.tuicool.com/articles/ZVbYra

### 名词解释

Schema  ：  一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

Model   ：  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

Entity  ：  由Model创建的实体，他的操作也会影响数据库

### getting start

1.首先你必须安装MongoDB和NodeJS

2.在项目只能够创建一个数据库连接，如下:

    var mongoose = require('mongoose');    //引用mongoose模块
    var db = mongoose.createConnection('localhost','test'); //创建一个数据库连接
		
3.打开本机localhost的test数据库时，我们可以监测是否有异常

    db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
      //一次打开记录
    });
		
注意：

成功开启数据库后，就可以执行数据库相应操作，假设以下代码都在回调中处理

4.定义一个Schema

    var PersonSchema = new mongoose.Schema({
      name:String   //定义一个属性name，类型为String
    });
		
5.将该Schema发布为Model

    var PersonModel = db.model('Person',PersonSchema);
    //如果该Model已经发布，则可以直接通过名字索引到，如下：
    //var PersonModel = db.model('Person');
    //如果没有发布，上一段代码将会异常
		
6.用Model创建Entity

    var personEntity = new PersonModel({name:'Krouky'});
    //打印这个实体的名字看看
    console.log(personEntity.name); //Krouky
		
7.我们甚至可以为此Schema创建方法

    //为Schema模型追加speak方法
    PersonSchema.methos.speak = function(){
      console.log('我的名字叫'+this.name);
    }
    var PersonModel = db.model('Person',PersonSchema);
    var personEntity = new PersonModel({name:'Krouky'});
    personEntity.speak();//我的名字叫Krouky
		
8.Entity是具有具体的数据库操作CRUD的

    personEntity.save();  //执行完成后，数据库就有该数据了
		
9.如果要执行查询，需要依赖Model，当然Entity也是可以做到的

    PersonModel.find(function(err,persons){
      //查询到的所有person
    });

注意：

1. 具体的如何配置Schema、Model以及Model和Entity的相关操作，我们会在后面进行

2. Model和Entity都有能影响数据库的操作，但仍有区别，后面我们也会做解释


### 文档

Find the API docs [here](http://mongoosejs.com/docs/api.html), generated using [dox](http://github.com/visionmedia/dox).

cd到node_modules/mongoose里

```
npm install
node static.js
```

这样就可以再本地看mongoose的api了

### 例子

每个例子都不错，必须熟悉

![](./images/mongoose.png)

node modules的好处是可以随时看到代码，是不是很爽啊？

## 高级

- gridfs
- 集群
## 总结


