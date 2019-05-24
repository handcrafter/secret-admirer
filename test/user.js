var assert = require('chai').assert;
var expect = require('chai').expect;

const database = require('../db/database');
const user = require('../db/user');

describe('saving records', function() {
    it('Establish a connection with database', function(done) {
        database.connect();
        done();
    });

    it('Sign up a user', function(done) {
        var newUser = new user.User({
            id: "aaa",
            password: "111"
        });

        newUser.save().then(res => {
            expect(res.id).to.equal("aaa");
            expect(res.password).to.equal("111");
            done();
        }).catch(err => {
            done(new Error("Failed to sign up user" + err));
        });
    });

    it('Sign in a user', function(done) {
        var existingUser = new user.User({
            id: "aaa",
            password: "aaa"
        });

        if (expect(user.User.findOne(existingUser.id))) {
            if (expect(user.User.findOne(existingUser.password))) {
                done();
            } else {
                done(new Error("Fail to sign in user : Wrong Password"));
            }
        } else {
            done(new Error("Faill to sign in user : User ID does not exist"));
        }
    });

    it('Close the connection with database', function(done) {
        database.disconnect();
        done();
    });
});
