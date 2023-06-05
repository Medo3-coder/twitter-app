//get login page
exports.login = (req, res) => {
    res.status(200).render("login");
}

//get register page
exports.register = (req, res) => {
    res.status(200).render("register");
}


exports.homePage = (req, res) => {
    var payload = {
        pageTitle: "home",
    }
    res.status(200).render('home', payload);
}