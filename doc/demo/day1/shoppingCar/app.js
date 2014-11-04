var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./dataModel/users');


var register = require('./routes/register');
var login = require('./routes/login');
var showArticalList = require('./routes/showArticalList');
var storeMyCartList = require('./routes/storeMyCartList');
var getMyCartLists = require('./routes/getMyCartList');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:7000/mytest');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('yes');
});

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(''));
app.use(session({ 
    secret: 'xiaolong', 
    cookie: { maxAge: 10000000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

//注册
app.use('/register', register);
//登陆
app.use('/login', login);
//显示所有商品
app.use('/getArticalList', showArticalList);
//加入购物车
app.use('/storeMyCart', storeMyCartList);
//读取我的购物车
app.use('/getMyCart', function(req,res){
    var user_name = req.session.userName;
    user.storeCartsObj.find({'userName':user_name},function(err,arr){
        
        var newArr = [];

        for(var i=0; i<arr.length; i++){
            var json = arr[i].toJSON();
            json.count = 1;
            newArr.push(json);
        };
        
        var newtoArr = reorganize(newArr);
        console.log(newtoArr);

        res.status(200).json({
            code:0,
            msg:newtoArr
        });
        
    });
    
});

function reorganize(arr){
    var newarr = [];
    console.log('reorganize');
    for(var i=0; i<arr.length; i++){
        if(findarr(newarr,arr[i].articlId)){
            var arr_get = findarr(newarr,arr[i].articlId);
            var getcount = parseInt(arr_get.count);
            if(!getcount){
                getcount = 1;
            }else{
                getcount++;
            };
            setarr(newarr,arr[i].articlId,{
                count:getcount
            });
        }else{
            newarr.push(arr[i]);
        };
    };

    return newarr;
};

function findarr(arr,n){
    console.log('findarr');
    for(var i=0; i<arr.length; i++){
        if(arr[i].articlId == n){
            return arr[i];
        };
    };

    return false;
};

function setarr(arr,n,json){
    console.log(arr);
    console.log(n);
    console.log(json);
    for(var i=0; i<arr.length; i++){
        if(arr[i].articlId == n){
            for(var attr in json){
                var jsonnow = arr[i];
                jsonnow.count = json[attr];
                console.log(jsonnow);
                //console.log(json[attr]);  
            };
        };
    };
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
