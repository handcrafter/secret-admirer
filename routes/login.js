const express = require('express');
const bodyParser = require('body-parser');
const user = require('../db/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/signup', function(req, res, next) {
    user.User.findOne({id:req.body.id}, function(err, result) {
        // If id is not found, insert hashed user info into database
        if (err) {
            console.error(err);
        } else if (!result) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    var newUser = {
                        id: req.body.id,
                        password: hash
                    }
                    console.log(newUser);
                    user.User.create(newUser, function(err, doc) {
                        if (err) {
                            console.error(err);
                        } else {
                            res.send("Sign up successful!");
                        }
                    });
                });
            });
        } else {
            res.status(400).send("Existing ID");
        } 
    })
})

router.put('/signin', urlencodedParser, async(req, res) => {
    console.log(req.body)
    let userid = await user.User.findOne({id: req.body.id});
    if (!userid) {
        res.status(401).send('Invalid id please sign up');
    } else {
        bcrypt.compare(req.body.password, userid.password, function(err, result) {
            if (result) {
                return res.send("Sign in Successful");
            } else {
                return res.status(400).send("Wrong Password");
            }
        });
    }
});

module.exports = router;
