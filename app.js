const express = require('express');
const app = express();
const login = require('./middleware/requireLogin')
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

app.use('/', loginRoute)
app.use("/login", loginRoute);
app.use("/", registerRoute);




