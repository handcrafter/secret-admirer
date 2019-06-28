const express = require('express');
const bodyParser = require('body-parser');
const favorite = require('../db/favorite');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addFav', urlencodedParser, async(req, res) => {
    let username = await favorite.Favorite.findOne({
        username: req.body.username
    });

    if (!username) {
        var newUser = new favorite.Favorite(req.body);
        newUser.save().then(item => {
            res.send('added to favorite')
        }) 
    } else {
        // if user have been used favorite before then update the list 
        var userfav = 0;
        username.favorite.forEach( function(item, index) {
            if (item === req.body.favorite) userfav = 1;
        })

        if (!userfav) {
            var newVal = { $push: {favorite: req.body.favorite} };
            favorite.Favorite.updateOne( {username: req.body.username}, newVal, function(err, result) { 
                if (err) { 
                    console.log('Selected celebrity is already in the database', err);
                    res.status(401).send('unable to update')
                } else {
                    console.log('document updated')
                    res.send('update successful')
                }
            });
        } else {
            res.status(400).send('already in favorite')
        }
    }
});

module.exports = router;
