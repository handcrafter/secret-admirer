const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
//user schema
var UserSchema = new Schema({
    id: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.plugin(uniqueValidator);
module.exports.UserSchema = UserSchema;
