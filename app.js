const express = require('express');
const app = express();
const login = require('./middleware/requireLogin')
const port = 3000;
const server = app.listen(port, () => console.log(`listening on port: ${port}`));

app.set('view engine', 'pug');
app.get('/', login, (req, res, next) => {

    var payload = {
        pageTitle: "home",
    }
    res.status(200).render('home', payload);
})
