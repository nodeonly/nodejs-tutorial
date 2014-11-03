var mongoose = require('mongoose');
var articlListArr = require('./articalList');

/**
 *用户名密码表
**/
var kittySchema = mongoose.Schema({
    name: String,
    password:String
});
var userObj = mongoose.model('user', kittySchema);

/**
 *用户选购的物品
**/
var articlSchema = mongoose.Schema({
	userName:String,
	articlId:Number,
    name:String,
    price:Number
});
var storeCartsObj = mongoose.model('userCarts',articlSchema);


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

module.exports = {
	userObj:userObj,
	storeCartsObj:storeCartsObj,
	articlObj:articlObj
};