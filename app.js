const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const path = require('path');

const app = express(); //initializing express server

app.use(bodyParser.urlencoded({ extended: false }));


dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

//Templating Engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', '.hbs'); //using hbs as view engine
app.use(express.static('public'));

// Routers
const appRouter = require('./routes/router.js');
const db = require('./models/db.js');
app.use('/', appRouter);

// Funtions
db.connect();

app.listen(port, hostname, function() {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port +  '/Login');
}); 