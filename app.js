const express = require('express');
const app = express();
const path = require('path');


// sending text to local host
app.get('/', (req, res) => {

    res.send('Hello World!');

});


/*
get all members in schema
app.get('api/schema', (res, req) => res.json('schema'));

*/


/*
set a static folder
app.use(express.static(path.join(__dirname, 'templates')));
*/

/*

Initiate a html file to website manually

app.get('/', (req, res) => { 

    res.sendFile(path.join(__dirname, 'templates', 'html file'));

});

*/



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT ' + PORT));