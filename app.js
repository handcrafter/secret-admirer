const express = require('express');
const path = require('path');
const routeLogin = require('./routes/login');

var database = require('./db/database');

var logger = require('./middleware/logger');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(logger)

// databse
database.connect();

//routers
app.use(routeLogin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on PORT ' + PORT));
