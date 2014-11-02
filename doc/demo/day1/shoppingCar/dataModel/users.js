var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
    name: String,
    password:String
});
var userObj = mongoose.model('user', kittySchema);

module.exports = {
	userObj:userObj
};