const express = require('express');
const path = require('path');
const app = express();
const routeLogin = require('./routes/api/login');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set a static folder
app.use(express.static(path.join(__dirname, 'templates')));

app.use(routeLogin);
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on PORT ' + PORT));