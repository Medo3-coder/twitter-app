const express = require('express');
const app = express();
const router = express.Router();

const {postController} = require("../../controllers/api")

router.post('/posts' ,postController.addPost);

module.exports = router; 