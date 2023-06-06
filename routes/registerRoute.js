const express = require('express');
const app = express();
const router = express.Router();
const authController = require("../controllers/site/authController/authController");



router.get("/register", authController.registerPage);
router.post("/postRegister", authController.register);




module.exports = router;






