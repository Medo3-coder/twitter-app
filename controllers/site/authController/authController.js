const User = require("../../../models/userModel");
const bcrypt = require("bcrypt");


//get login page
exports.login = (req, res) => {
    res.status(200).render("login");
}

//get register page
exports.registerPage = (req, res) => {
    res.status(200).render("register");
}


exports.homePage = (req, res) => {
    var payload = {
        pageTitle: "home",
    }
    res.status(200).render('home', payload);
}

exports.register = async (req, res) => {


    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;
    if (firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
            .catch((error) => {
                console.error(error);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("register", payload);
            });

        if (user == null) {
            // no user found
            var data = req.body;
            data.password = await bcrypt.hash(password , 10);
            User.create(data)
                .then((user) => {
                    console.log(user);
                })

        } else {
            //user found
            if (email == user.email) {
                payload.errorMessage = "email already in use.";

            } else {
                payload.errorMessage = "Username already in use.";

            }
            res.status(200).render("register", payload);
        }
    }
    else {
        payload.errorMessage = "make sure each field has a valid value";
        res.status(200).render("register", payload);
    }

};