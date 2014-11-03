var mongoose = require('mongoose');

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
    count:Number,
    name:String,
    price:Number
});
var storeCartsObj = mongoose.model('userCarts',articlSchema);

module.exports = {
	userObj:userObj,
	storeCartsObj:storeCartsObj
};