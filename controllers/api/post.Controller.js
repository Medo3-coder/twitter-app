const { response } = require("express");
const { Post, User } = require("../../models");

module.exports.addPost = async (req, res) => {

    if (!req.body.content) {
        console.log("content param is not sent with request");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData).
        then(async newPost => {
            newPost = await User.populate(newPost, { path: "postedBy" });
            res.status(201).send(newPost);
        })
        .catch(err => {
            console.log(err);
            console.sendStatus(400);
        });
}

module.exports.getPosts = (req, res) => {
    //return all posts list
    Post.find().populate("postedBy").sort({ "createdAt": "desc" })
        .then(results => res.status(200).send(results))
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
}


module.exports.likePost = async (req, res) => {
    var postId = req.params.id;
    var userId = req.session.user._id;
    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    var option = isLiked ? "$pull" : "$addToSet";

    //insert user like  
    //[] square brackets allows you to inject a variable and use it as the option.
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true })
    .catch(err => {
        console.log(err);
        res.sendStatus(400)
    })

    //insert post like 

    res.status(200).send('yahoo');


}