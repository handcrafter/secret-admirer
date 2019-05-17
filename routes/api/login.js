const express = require('express');
const router = express.Router();
const usermodel = require('../../usermodel');
const Users = require('../../templates/models/Users');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//Sign Up
router.post('/login', urlencodedParser, function(req,res){
    console.log(req.body);
    var newUser = new usermodel.User(req.body);
    newUser.save().then(item => {
        //res.send("user saved to database");
        //req.flash('message');
        res.redirect('/signin.html');
    }).catch(err => {
        res.status(400).send("Unable to save to database");
    });
  //  res.render('login-success', {data: req.body});
});

//Sign in logic
router.post('/signin', urlencodedParser, async(req,res) => {
    // check is id exist
    let userid = await usermodel.User.findOne({id: req.body.id});
    if(!userid){ return res.status(400).send('Invalid id please sign up');}
    else{
        //if ID does exist then check if password corresponding that id exist as well
        let userpass = await usermodel.User.findOne({id:req.body.id, password: req.body.password});
        if(!userpass){return res.status(400).send('Wrong password');}
        else{ res.redirect('/login-success.html');}
    }
    res.send(true);
});
module.exports = router;