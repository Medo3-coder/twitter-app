const express = require('express');
const app = express();
const router = express.Router();
const auth = require('../middlewares/auth')
const { authController } = require("../controllers/site");



router.get('/', auth,authController.homePage);

router.get('/login', authController.loginPage );
router.post('/loginIn', authController.login );
router.get("/logout",authController.logout);
router.get("/register", authController.registerPage);
router.post("/postRegister", authController.register);



module.exports = router ;






