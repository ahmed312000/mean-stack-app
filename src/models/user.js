var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username : {required : true , type : String },
    email : {required : true , type : String},
    password : {required : true , type : String},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User' , schema);