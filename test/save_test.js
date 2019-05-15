const assert = require('assert');
const Article = require('../templates/models/article');



//Describe test
describe('saving records', function(){

        //create tests

    it('Save data to the local mongodb', function(done){
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
        


    });    

});
