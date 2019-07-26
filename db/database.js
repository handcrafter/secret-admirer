const mongoose = require('mongoose');

module.exports.connect = function() {
    // ES6 Promises
    mongoose.Promise = global.Promise;

    // mongoose
    mongoose.connect('mongodb://localhost/secret-admirer');

    let db = mongoose.connection;

    // check for db connections
    db.once('open', function() {
        console.log('Connected to mongoDB');
    });

    // check for db errors
    db.on('error', function(err) {
        console.err(err);
    });
}

module.exports.disconnect = function() {
    mongoose.connection.close()
}
