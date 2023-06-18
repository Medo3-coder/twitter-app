const {User} = require("../../models");


const bcrypt = require("bcrypt");


module.exports.homePage = (req, res) => {
    var payload = {
        pageTitle: "home",
        userLoggedIn: req.session.user
    }
    res.status(200).render('home', payload);
}


//get login page
module.exports.loginPage = (req, res) => {
    res.status(200).render("auth/login");
}

module.exports.login = async (req, res) => {
    var payload = req.body;

    if (req.body.LogUsername && req.body.LogPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.LogUsername },
                { email: req.body.LogUsername },
            ]
        })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("auth/login", payload);
            });

        if (user != null) {
            var result = await bcrypt.compare(req.body.LogPassword, user.password);
            if (result === true) {
                req.session.user = user;
                return res.redirect("/");
            }
        }

        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("auth/login", payload);

    }
    payload.errorMessage = "make sure each field has a valid value";
    res.status(200).render("auth/login", payload);
}

//get register page
module.exports.registerPage = (req, res) => {
    res.status(200).render("auth/register");
}




module.exports.register = async (req, res) => {


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
                res.status(200).render("auth/register", payload);
            });

        if (user == null) {
            // no user found
            var data = req.body;
            data.password = await bcrypt.hash(password, 10);
            User.create(data)
                .then((user) => {
                    req.session.user = user;
                    return res.redirect("/");
                })

        } else {
            //user found
            if (email == user.email) {
                payload.errorMessage = "email already in use.";

            } else {
                payload.errorMessage = "Username already in use.";

            }
            res.status(200).render("auth/register", payload);
        }
    }
    else {
        payload.errorMessage = "make sure each field has a valid value";
        res.status(200).render("auth/register", payload);
    }

};


module.exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect("login");
        });
    }
}