const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('./middleware/logger')

const app = express();

//ES6 Promises
mongoose.Promise = global.Promise;

//mongoose
mongoose.connect('mongodb://localhost/sadb');
let db = mongoose.connection;

//chekc for db connections
db.once('open', function(){

    console.log('Connected to mongoDB');
});

//check for db errors
db.on('error', function(){
    console.log(err);
});


//Init middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//set a static folder
app.use(express.static(path.join(__dirname, 'templates')));



//Initiate a html file to website manually
/*
app.get('/', (req, res) => { 

    res.sendFile(path.join(__dirname, 'templates', 'index.html'));

});

*/

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT ' + PORT));