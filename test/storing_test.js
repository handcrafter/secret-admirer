
const assert = require('assert');

const mocha = require('mocha');

const AdminName = require('../models/testAdmin');

describe('mocha test code', function(){
    //create tests

    it('store name on mongo db', function(done){

        var newUser = new AdminName({

            name: 'Jaewon'

        });

        newUser.save().then(function(){

                assert(newUser.isNew === false);
                done();

    });

});

});