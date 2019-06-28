const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//favorite schema
var FavoriteSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        index: true
    },
    favorite: [{
        type: String,
        index: true
    }]
});

FavoriteSchema.plugin(uniqueValidator);

var Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports.Favorite = Favorite;
