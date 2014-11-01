#写给 Node.js 学徒的 7 个建议


原文出处： Faisal Abid   译文出处：Di Wu （@唯木念） 

## 一些我更愿意在开始就知道东西

利用 Node.js 开发是一个非常有趣，和令人满足的过程， 它有3万多个模块可以选择使用，并且所有的模块可以非常容易的集成入现有的应用之中。

无论如何，对于一些刚开始使用Node.js 开发的的人来说， 很容易碰壁，在这个文章中，我会提到在你学习过程中遇到的问题。

## 贴士 1: 在开发环境使用 nodemon， 在生产环境使用pm2

当你第一次开发Node.js应用的时候， 其中一件事情就是一次又一次的运行[file].js 就和揭伤疤一样。 当我第一次开发的node app时候，这个让我感到异常挫败和痛苦， 尤其是每当我修改很小东西的时候需要control+c

幸运的是我发现了一个非常棒的工具Nodemon。 你可以利用以下的命令来安装


	npm install -g nodemon

Nodemon 是一个令人惊叹的工具， 当你全局安装它以后， 可以通过 nodemon [file].js 来启动你的node.js scripts，它会告诉nodemon来监视你的script和scripts的所有变化， 这样的Node.js开发方式非常震撼以及让大大提高开发速度。

那么，生产环境又如何， 除非你用了heroku，Nodejitsu或者其它一些好的 Node.js 平台(也许它们有类似的功能)， 但是碰巧你用了EC2 或者一些其它的云平台来运行你的Node.js app， 你如何能然保证这是一个始终运行的Node.js app

案就是PM2， PM2 是一个类似于Nodemon的工具，不同之处在于它用于生产环境， 和Nodemon相似的地方在于它会监控你的app的任何修改或者重新部署，但是有更好的一面， PM2 在遭遇到崩溃的时候，它会正确重启你的app。

PM2的优胜之处在于当你要将app需要多核处理的时候，PM2内部集成的负载均衡可以让你很容易的去指定运行多少个实例。


	pm2 start app.js -i max
	
-i参数目的是指定运行多少个实例，在这个例子中 PM2 使用了一个常量max来扩展你的app运转到你最大的核数，不要忘记Node 平时只会运行在单核!

## 贴士 2: Async 或者 Q

当你专注于写了更多的node.js apps的时候，你肯定领略了什么是回调地狱。 如果你还不知道，这里有一个例子:
```
function register(name， password， cb){
  checkIfNameExists(name， function(err， result){
   if(err){
    return cb(“error”);
   }
   checkIfPasswordGood(password， function(err， result){
    if(err){
     return cb(“error”);
    }
 
    createAccount(name，password， function(err，result){
     if(err){
      return cb(“error”);
     }
     createBlog(name， function(err， result){
      sendEmail(name， function(err， result){
       callback(result);
      });
     });
    });
   });
  });
 }
```


这显然不是一个有用或者令人折服的代码， 反而进入一种回调地狱般两难的境地，是你的话将如何避免

一个简单的办法是使用events， 但是我个人不建议这么做，因为使用events来调用只有一个用途的私有方法，足以令人受挫

所以你该怎么做 这里有两个编译好的模块，async.js和Q， 它们两个都可以防止落入回调地狱

Async.js或者 ‘async’ 让你可以容易的执行一些连续或者平行的任务，在不依赖一个又一个的嵌套循环前提下。

下面是一些来自Async的readme，写明了它支持的模式， 如需获取全部的支持方式请去它们的github主页查看。

```
async.map([‘file1'，’file2'，’file3']， fs.stat， function(err， results){
  // results is now an array of stats for each file
 });
 
 async.filter([‘file1'，’file2'，’file3']， fs.exists， function(results){
 // results now equals an array of the existing files
});
 
 async.parallel([
  function(){ … }，
  function(){ … }
  ]， callback);
 
 async.series([
  function(){ … }，
  function(){ … }
  ]);
 
 async.waterfall([
  function(callback){
   callback(null， ‘one’， ‘two’);
  }，
  function(arg1， arg2， callback){
   callback(null， ‘three’);
  }，
  function(arg1， callback){
 // arg1 now equals ‘three’
 callback(null， ‘done’);
 }
 ]， function (err， result) {
 // result now equals ‘done’ 
});
```

如果我们用async的waterfall来修改之前的例子，结果将更加容易阅读， 再也不用让你的代码看起来像一个死亡金字塔。

另一个重要的库叫做Q。 这个库是一个暴漏promises的概念， Promise 是一个含有’promise’方法的返回对象，它提供了一个最终的返回值，非常优雅的将javascripts的异步和node.js紧密联系在一起。

For example， taken from Q’s repo page.

```
promiseMeSomething()
.then(function (value) {
}， function (reason) {
});
```

这个 promise me 方法 正确返回了一个对象， 对象将在传入value的时候调用这个方法当，并且它提供了一个额外的callback来处理失败后的返回值

这是一个非常有条理的方式来避免回调地狱，如果你重写我们之前的那个例子，你可以非常容易的让这些函数正确被调用并执行。

就和我之前说的一样， 我很不愿创建只有一个用途的一堆功能，相反的在’then’之后传入一个方法名，仅仅创建了一个匿名的内部功能和传递，当然了选择权始终在你手里。

总的来说，当你落入回调地狱的时候，是时候去看看 async.js或者Q吧。

我的选择 当然是 Q

## 贴士 3: 轻松调试 Node.js apps

如果你从一个IDE重度集成的语言比如java 或者C# 转来调试Node.js， 你一定会感到很困扰， 大部分新加入node的开发者采用了’flow’的调试模式，从这一刻开始你最好的朋友就是console.log

但是依然有更常见的调试方式来代替， Node.js 内置了一个调试器你可以称为 node debug， 不过我更喜欢的 node-inspector

它们的github说 “Node Inspector 是一个使用Blink Developer Tools (以前称为WebKit Web Inspector)node.js调试器的界面，”

简而言之，node-inspector 可以让你用任何你想用的编辑器和chrome web tools来调试你的应用，这是多么的性感。

Node-inspector 可以让你做一些非常酷的事情，比如实时修改，单步调试，注入以及一堆其它非常酷的东西。

让我们来根据指示一步一步安装

https://github.com/node-inspector/node-inspector

## 贴士 4: Nodefly

一旦你有你的应用程序正常运行，你可能会问自己，你怎么可以监视它的性能和配置文件，以确保您的应用程序运行在最佳的速度。最简单的答案是一个卓越的服务，我称为Nodefly。

用简单的一行代码Nodefly开始监视你的应用程序内存泄漏，测量redis用了多久，mongo查询和一堆其它很酷的东西。

http://www.nodefly.com

## 贴士 5: 利用NPM进行模块管理

Node做最常见的事情之一是通过NPM安装软件包。Node有一个惊人的包管理器安装所有指定在你的package.json的manifest文件中的模块。然而，所有初学者都会碰上保持的package.json文件中您所使用的所有的模块都是最新版。

这似乎是一个痛苦的过程，总是打开的package.json来更新新模块的依赖，但许多人不知道的是npm会为你做这个！

非常简单运行 npm install – save module_name 然后 npm将自动更新你的package.json 包含正确的模块和版本，

	npm install - save module_name
 

## 贴士 6: 不要提交 node_modules 文件夹

虽然我们的话题一直是modules和npm，但是并不是不是很多人都知道，你不应该提交node_modules文件夹。这背后最大的原因是，没有必要提交这个文件夹。只要有人下载你的代码，它们可通过运行NPM来安装和下载所有需要的模块。

您可能会说，它是不是一个大问题，如果检查node_modules，但是，如果下载代码的人使用了和你编译modules不一样的操作系统的来安装通过NPM？你的应用程序将会崩溃，下载代码的人将不知道为什么会如此！

举个例子bcrypt以及sentimental如果当在您安装在主机系统上编译它们，因为它们用了本地C语言组件来编译。

避免检查node_modules文件夹的方式是加入.gitignore

	// .gitignore node_modules/*
 

## 贴士 7: 别忘记返回

初学者经常犯一个很常识的错误，就是忘记callback后的返回值，虽然有些时候，这没有影响，有很多时候，你会遇到奇怪的问题，因为你的回调被调用两次。

让我们看一个简单的例子

```
function do(err，result， callback){
   if(err){
      callback(“error”);
  }
  callback(“good”);
 }
```

乍一看，这个片段是有道理的。如果有错误，在回调中发送“错误。如果不发送return，调用callaback后这个函数不会停下来。它只是将移动到调用回callback(“good”)。

这样做在长期和复杂的代码行里面会节省几个小时的调试。