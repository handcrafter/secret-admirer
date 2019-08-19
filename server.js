const express = require('express');
const path = require('path');
const routeLogin = require('./routes/login');
const routeList = require('./routes/celebrityList');
const routeFavourite = require('./routes/favourite');
const routeImageExtractor = require('./routes/imageUrls');
const cors = require('cors');
var database = require('./db/database');
var logger = require('./middleware/logger');
var Celebrity = require('./db/celebrity');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// databse
database.connect();
Celebrity.init();

//routers
app.use(routeLogin);
app.use(routeList);
app.use(routeFavourite);
app.use(routeImageExtractor);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on PORT ' + PORT));
