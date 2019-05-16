const assert = require('assert');
const Article = require('../templates/models/article');



//Describe test
describe('finding records', function(){

    //create tests

    beforeEach(function(done){

        this.timeout(15000);
    setTimeout(done, 15000);


    var myArt = new Article({
    
        title: 'Test Article',
        author: 'Jaewon Lee',
        body: "Article for test case"

    });

    myArt.save().then(function(){

        assert(myArt.isNew === false); 
        done();


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

});
