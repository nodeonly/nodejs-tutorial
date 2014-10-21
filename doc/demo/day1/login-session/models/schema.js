var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;


/*var kittySchema = mongoose.Schema({
    username: String,
	password: String
})

var Kitten = mongoose.model('Kitten', kittySchema);


module.exports = {
  Kitten :Kitten
};*/


var userSchema = mongoose.Schema({
	username: String,
	password: String
})

var User = mongoose.model('users', userSchema);


module.exports = {
	User :User
};



