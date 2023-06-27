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
    Post.find().populate("postedBy").sort({"createdAt": "desc"})
    .then(results => res.status(200).send(results))
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
}