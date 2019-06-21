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
    var celebs = [{name: 'BTS', gender: 'M', imgPath: 'client/src/BTS1.jpg'},
                {name: 'IZ*ONE', gender: 'F',imgPath: 'client/src/IZ*ONE1.jpg'},
                {name: 'TWICE', gender: 'F', imgPath: 'client/src/TWICE1.jpg'}]

    Celebrity.collection.insert(celebs, function (err, docs) {
        if (err) { 
            console.error('celebs are already in the database');
        } else {
            console.log("Celebs are inserted to collection");
        }
    });    
}
