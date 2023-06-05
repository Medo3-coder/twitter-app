const express = require('express');
const app = express();
const login = require('./middleware/requireLogin')
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://medo:LoooooL2244565@twitterclonecluster.or0hxwd.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('database connection established')
    })
    .catch((err) => {
        console.log('database connection error' + err.message)
    })
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
app.use("/register", registerRoute);




