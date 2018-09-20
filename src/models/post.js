var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')
var schema = new Schema({
    authorName : { type : String  ,required : true , ref: 'User.username' },
    content : {type : String , required : true},
    date : { type : Date , required : true },
    user: {type: Schema.Types.ObjectId, ref: 'User'}

});

schema.post('remove' , (post) => {
    User.findById(post.user , (err , user) => {
        if(err) {
            return res.status(500).json({
                title : 'there is an DELETE error bud',
                error : err
            })
        }
        user.posts.pull(post._id) ;
        user.save();
    })
})

module.exports = mongoose.model('Post' , schema);