const express = require('express');
const app = express();
const router = express.Router();

const {postController} = require("../../controllers/api")

router.post('/add-post' ,postController.addPost);
router.get('/get-posts' ,postController.getPosts);
router.put('/post/:id/like' ,postController.likePost);



module.exports = router; 