const http = require('http');
const dotenv = require('dotenv');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

// Router
const appRouter = require('./router/router');
app.use('/', appRouter);

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;


app.listen(port, hostname, () => {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port);
})