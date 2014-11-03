var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var articlListArr = require('./dataModel/articalList');

var register = require('./routes/register');
var login = require('./routes/login');
var showArticalList = require('./routes/showArticalList');
var storeMyCartList = require('./routes/storeMyCartList');
var getMyCartList = require('./routes/getMyCartList');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:7000/mytest');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('yes');
});

var app = express();

//插入物品列表数据
var articlSchema = mongoose.Schema({
    articlId:Number,
    name: String,
    price:Number
});
var articlObj = mongoose.model('articlForm', articlSchema);

articlObj.find(function(err,dataArr){
    if(!dataArr.length){
        //还没有物品列表数据,创建9个物品
        for(var i=0; i<8; i++){
            var item = new articlObj({
                articlId:i,
                name:articlListArr[i].name,
                price:articlListArr[i].price
            });
            item.save();
        };
    }else{
        console.log('list has exist');
    };
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(''));
app.use(session({ 
    secret: 'xiaolong', 
    cookie: { maxAge: 10000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', register);
app.use('/login', login);
app.use('/getArticalList', showArticalList);
app.use('/getMyCart', getMyCartList);
app.use('/storeMyCart', storeMyCartList);

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
