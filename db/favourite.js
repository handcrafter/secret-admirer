const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//favourite schema
var FavouriteSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        index: true
    },
    favourite: [{
        type: String,
        index: true
    }]
});

FavouriteSchema.plugin(uniqueValidator);

var Favourite = mongoose.model('Favourite', FavouriteSchema);
module.exports.Favourite = Favourite;
