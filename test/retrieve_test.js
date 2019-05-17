const assert = require('assert');
const mongoose = require('mongoose');
const Article = require('../templates/models/article');



//Describe test
describe('finding records', function(){

    //create tests

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

it('Retrieve one record from database', function(done){

        Article.findOne({
            title: 'Test Article',
            author: 'Jaewon Lee',
            body: "Article for test case"
        }).then(function(result){

            assert(result.title === 'Test Article');
        });
        done();
    });
    


});    


