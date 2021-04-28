const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs  = require('express-handlebars');

const app = express(); //initializing express server

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

// Database connection
const db = require('./models/db.js');
db.connect();

// Routers
const appRouter = require('./routes/router.js');
app.use('/', appRouter);

app.set('view engine', '.hbs'); //using hbs as view engine
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

//Templating Engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));





app.listen(port, hostname, function() {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port +  '/Login');
}); 