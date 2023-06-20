const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema  = new mongoose.Schema({
    content: {type : String , trim: true},
    postedBy: {type : ObjectId , ref: "User"},
    pinned : {type:Boolean}

}, {timestamps:true});

var Post = mongoose.model('Post' , postSchema);

module.exports = Post;