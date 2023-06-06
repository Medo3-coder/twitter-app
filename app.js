const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const mongoose = require('./database');
const path = require('path');
const bodyParser = require('body-parser');


const server = app.listen(port, () => console.log(`listening on port: ${port}`));

app.set('view engine', 'pug');
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes 
// Routes
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');

app.use(session({
    secret: 'secret123', //a random unique string key used to authenticate a session
    resave: true,   // It enables the session to be stored back to the session store
    saveUninitialized: false  //session is created but not modified
}))
app.use('/', loginRoute)
app.use("/login", loginRoute);
app.use("/", registerRoute);




