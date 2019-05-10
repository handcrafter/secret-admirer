const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

//create test schema and model;



const AdminNameSchema = new mongoose.Schema({

    name: String,
    age: Number
});

const AdminName = mongoose.model('AdminName', AdminNameSchema);

module.exports = AdminName;