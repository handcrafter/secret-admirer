const express = require('express');
const bodyParser = require('body-parser');
const user = require('../db/user');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

//Sign Up
router.post('/signup', urlencodedParser, function(req, res){
    console.log(req.body);
    var newUser = new user.User(req.body);
    newUser.save().then(item => {
        res.send('signup is successful')
    }).catch(err => {
        res.status(400).send(err, "Unable to save to database");
    });
});

//Sign in logic
router.post('/signin', urlencodedParser, async(req, res) => {
   console.log(req.body)
    let userid = await user.User.findOne({id: req.body.id});
    if (!userid) {
        res.status(401).send('Invalid id please sign up');
    } else {
        let userpass = await user.User.findOne({
            id: req.body.id,
            password: req.body.password
        });
        if (!userpass) {
            return res.status(400).send('Wrong password');
        }
        res.send('signin is successful');
    }
});

module.exports = router;
