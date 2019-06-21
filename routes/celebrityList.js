const express = require('express');
const bodyParser = require('body-parser');
const celebrity = require('../db/celebrity');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/list', urlencodedParser, function(req, res){
    celebrity.Celebrity.find({}, {"_id":1, "name": 1, "imgPath" : 1}).then(function(err, doc){
        if(err){ 
            res.send(err) 
        } else{ 
            res.send(doc) 
        }
    })
})

module.exports = router;
