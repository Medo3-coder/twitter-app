module.exports.addPost = async (req, res) => {

    if(!req.body.content){
        console.log("content param is not sent with request");
        return res.sendStatus(400);
    }

    res.status(200).send("it Worked");
}