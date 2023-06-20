const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema  = new mongoose.Schema({
    content: {type : String , trim: true},
    postedBy: {type : ObjectId , ref: "Users"},

}, {timestamps:true});

var Post = mongoose.model('Post' , postSchema);

module.exports = Post;