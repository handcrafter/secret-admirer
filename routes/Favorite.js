const express = require('express');
const bodyParser = require('body-parser');
const favorite = require('../db/favorite');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addFavorite', urlencodedParser, async(req, res) => {
    let username = await favorite.Favorite.findOne({
        username: req.body.username
    });

    if (!username) {
        var newUser = new favorite.Favorite(req.body);
        newUser.save().then(item => {
            res.send('added to favorite list');
        }) 
    } else {
        // if user have been used favorite before then update the list 
        var inList = false;
        if (username.favorite.includes(req.body.favorite)) {
            inList = true;
        }
       
        if (!inList) {
            var newVal = { $push: {favorite: req.body.favorite} };
            favorite.Favorite.updateOne( {username: req.body.username}, newVal, function(err, result) { 
                if (err) { 
                    console.log('Selected celebrity is already in the database', err);
                    res.status(401).send('unable to update');
                } else {
                    console.log('document updated');
                    res.send('update successful');
                }
            });
        } else {
            res.status(400).send('already in favorite');
        }
    }
});

router.post('/removeFavorite', urlencodedParser, async(req, res) => {
    let username = await favorite.Favorite.findOne({
        username: req.body.username
    });

    if (!username) {
        res.status(400).send('No celebrities in the list to remove');
    } else {
        // Check if selected celebrity is in the favorite list
        var remove = false;
        if (username.favorite.includes(req.body.favorite)) {
            remove = true;
        }

        if (!remove) {
            res.status(401).send('Selected celebrity is not in favorite list');
        } else {
            var query = { $pull: {favorite: req.body.favorite} };
            favorite.Favorite.updateOne( {username: req.body.username}, query, function(error, result){
                if (error) {
                    console.log('Cannot remove celebrity from the list', error);
                    res.status(401).send('error removing a celebrity from the favorite list');
                } else {
                    res.send('Successfully removed from favorite list');
                }
            })
        }
    }
})

router.post('/isFavorite', urlencodedParser, async(req, res) => {
    // if selected celebrity is in database turn favorite button On and if not turn off the button
    let isFavorite = await favorite.Favorite.findOne({
        username: req.body.username,
        favorite: req.body.favorite
    });

    if (isFavorite) {
        res.send('Favorite button On');
    } else {
        res.status(400).send('Favorite button Off');
    }
})

module.exports = router;
