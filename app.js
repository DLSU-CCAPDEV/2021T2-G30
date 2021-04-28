const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const store = require('connect-mongo');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express(); //initializing express server

app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;
url = process.env.DB_URL;

// Database connection
const db = require('./models/db.js');
db.connect();
 

//Session template
app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: store.create({mongoUrl: url})
}));

// Routers
const appRouter = require('./routes/router.js');
app.use('/', appRouter);

app.use(express.static('public'));

//Templating Engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', '.hbs'); //using hbs as view engine


app.listen(port, hostname, function() {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port +  '/login');
}); 