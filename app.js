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
console.log("test");
//Session template
app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    cookie: { secure: !true },
    store: store.create({mongoUrl: url})
}));

app.use(express.static('public'));

// Helper file
const helpers = require('./helpers/helpers.js');

//Templating Engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: helpers
}));

app.set('view engine', '.hbs'); //using hbs as view engine

// Routers
const appRouter = require('./routes/router.js');
app.use('/', appRouter);

//if route is not defined in the server
app.use(function(req, res) {
    res.status(404);
    res.render('error', {
        title: '404 Not found',
        css:['global', 'error'],
        status: {
            code: "404",
            message: "Not found"
        },
        sessionUser: req.session.uName 
    });
});

app.listen(port, function() {
    console.log('Server running at: ');
    console.log('http://' + port +  '/login');
}); 