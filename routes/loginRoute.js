const express = require('express');
const app = express();
const router = express.Router();
const login = require('../middleware/requireLogin')
const authController = require("../controllers/site/authController/authController");


router.get('/', login,authController.homePage);

router.get('/login', authController.loginPage );
router.post('/loginIn', authController.login );
router.get("/logout",authController.logout)



module.exports = router ;






