const mongoose = require('mongoose');


//connect to mongo db atlas
mongoose.connect('mongodb+srv://admin:secretadmin@secret-admirer-vhakq.mongodb.net/test?retryWrites=true', {

   //useMongoClient: true
   useNewUrlParser: true
});



mongoose.connection.once('open', function(){

console.log('connection successful');

}).on('error' ,function(error){

console.log('connection error', error);

});