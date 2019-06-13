const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//Star schema
var CelebSchema = new Schema({
   name: {type: String, required: true, unique: true},
   occupation: String,
   albums: Number
});

CelebSchema.plugin(uniqueValidator);

var Celeb = mongoose.model('Celeb', CelebSchema, 'Celebrities');  
module.exports.Celeb = Celeb;

exports.init = function(){
    var celebs = [{name: 'BTS', occupation: 'BoyGroup'},
        {name: 'IZ*ONE', occupation: 'GirlGroup'},
        {name: 'TWICE', occupation: 'GirlGroup'}]

    

    Celeb.collection.insert(celebs, function (err, docs) {
        if (err){ 
            return console.error('celebs are already in the database');
        } 
        else {
            console.log("Celebs are inserted to collection");
        }
    });
    
}

