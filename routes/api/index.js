const express = require('express');
const router = express.Router();

const posts = require('./posts.route');

router.use("/api" , posts);

module.exports = router;




