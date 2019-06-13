const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//Celebrity schema
var CelebritySchema = new Schema({
    name: {type: String, required: true, unique: true},
    gender: String,
    albums: Number
});

CelebritySchema.plugin(uniqueValidator);

var Celebrity = mongoose.model('Celebrity', CelebritySchema, 'Celebrity');  
module.exports.Celebrity = Celebrity;

module.exports.init = function(){
    var celebs = [{name: 'BTS', gender: 'M'},
                {name: 'IZ*ONE', gender: 'F'},
                {name: 'TWICE', gender: 'F'}]

    Celebrity.collection.insert(celebs, function (err, docs) {
        if (err) { 
            console.error('celebs are already in the database');
        } else {
            console.log("Celebs are inserted to collection");
        }
    });    
}
