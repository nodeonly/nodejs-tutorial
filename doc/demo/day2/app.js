var pro_db = {
    user: 'myMongoDB',
    pass: '',
    host: 'mongodb://local/myMongoDB'
};
 
exports.db = pro_db;
 
//建立db.js
var mongoose = require('mongoose'),
    async = require('async'),
    config = require('./config');
 
mongoose.connect(config.db.host, {
    user: config.db.user,
    pass: config.db.pass
});
 
// 定義model
var TestSchema = new mongoose.Schema({
    data: String,
    data2: String
});
//建立db存取方法

exports.getData = function(req, callback) {
    var TestModel = mongoose.model( 'test_collection', TestSchema,  'test_collection');
    TestModel
    .find({}, {_id: 0})
    .exec(function(err, docs) {
        if (err) {
            callback(err);
        } else {
            callback(null, docs);
        }
    });
};