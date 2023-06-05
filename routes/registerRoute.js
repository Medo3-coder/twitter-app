const express = require('express');
const app = express();
const router = express.Router();
const authController = require("../controllers/site/authController/authController");
const User = require("../models/userModel");


router.get('/', authController.register);


router.post('/', async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password.trim();

    var payload = req.body;
    if (firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        console.log(user);
        console.log('heelo');
    }
    else {
        payload.errorMessage = "make sure each field has a valid value";
        res.status(200).render("register", payload);
    }
});


module.exports = router;






