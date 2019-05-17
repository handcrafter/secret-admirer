const assert = require('assert');
const mongoose = require('mongoose');
const Article = require('../templates/models/article');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

describe('saving records', function() {
  it('Establish a connection to database', function(done) {
    //ES6 Promises
    mongoose.Promise = global.Promise;

    //mongoose
    mongoose.connect('mongodb://localhost/secret-admirer');
    let db = mongoose.connection;

    db.once('open', function() {
      done();
    });

    db.on('error', function() {
      done(new Error("Failed to connect secret-admirer database"));
    });
  });

  it('Saving user credential to the local mongodb', function(done) {
    app.post('/login', urlencodedParser, function(req,res){
        console.log(req.body);
        var newUser = new usermodel.User(req.body);
        newUser.save().then(item => {res.send("user saved to database");
        }).catch(err => {
            res.status(400).send("Unable to save to database");
        });
      //  res.render('login-success', {data: req.body});
      done();
    });
    
  });
});
