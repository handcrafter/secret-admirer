const mongoose = require('mongoose');
var Celebrity = require('./celebrity');

module.exports.connect = function() {
    // ES6 Promises
    mongoose.Promise = global.Promise;

    // mongoose
    mongoose.connect('mongodb://localhost/secret-admirer');

    let db = mongoose.connection;
    var celeb = Celebrity.init;

    // check for db connections
    db.once('open', function() {
        console.log('Connected to mongoDB');
        celeb();
    });

    // check for db errors
    db.on('error', function(err) {
        console.log(err);
    });
}

module.exports.disconnect = function() {
    mongoose.connection.close()
}
