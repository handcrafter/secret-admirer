const assert = require('assert');
const mongoose = require('mongoose');
const Article = require('../templates/models/article');


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

  it('Save data to the local mongodb', function(done) {
    var myArt = new Article({
      title: 'Test Article',
      author: 'Jaewon Lee',
      body: "Article for test case"
    });

    myArt.save(function (err) {
      if (err) {
        done(new Error("Failed to save an article"));
      }
      done();
    });
  });
});
