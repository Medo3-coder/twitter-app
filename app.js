const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port, () => console.log(`listening on port: ${port}`));

app.set('view engine', 'pug');
app.get('/' , (req, res,next) => {
    res.status(200).render('home');
})
