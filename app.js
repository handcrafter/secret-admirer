const express = require('express');
//const moment = require('moment');
const path = require('path');
const logger = require('./middleware/logger')

const app = express();

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