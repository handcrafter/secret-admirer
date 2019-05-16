const mongoose = require('mongoose');
var Users = require('./templates/models/Users');


//ES6 Promises
mongoose.Promise = global.Promise;
//mongoose
mongoose.connect('mongodb://localhost/sadb');
let db = mongoose.connection;
//chekc for db connections
db.once('open', function(){ console.log('Connected to mongoDB');
});
//check for db errors
db.on('error', function(){ console.log(err);  });


var User = mongoose.model('User', Users.UserSchema);
module.exports.User = User;
