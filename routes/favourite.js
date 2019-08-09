const express = require('express');
const bodyParser = require('body-parser');
const favourite = require('../db/favourite');
const celebrity = require('../db/celebrity');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addFavourite', urlencodedParser, async(req, res) => {
    let username = await favourite.Favourite.findOne({
        username: req.body.username
    });

    if (!username) {
        var newUser = new favourite.Favourite(req.body);
        newUser.save().then(item => {
            res.send('Added to favorite list');
        }) 
    } else {
        // if user have been used favorite before then update the list 
        var inList = false;
        if (username.favourite.includes(req.body.favourite)) {
            inList = true;
        }
       
        if (!inList) {
            var newVal = { $push: {favourite: req.body.favourite} };
            favourite.Favourite.updateOne( {username: req.body.username}, newVal, function(err, result) { 
                if (err) { 
                    console.error('Selected celebrity is already in the database', err);
                    res.status(401).send('unable to update');
                } else {
                    console.log('Document updated');
                    res.send('update successful');
                }
            });
        } else {
            res.status(400).send('already in favorite');
        }
    }
});

router.post('/removeFavourite', urlencodedParser, async(req, res) => {
    let username = await favourite.Favourite.findOne({
        username: req.body.username
    });

    if (!username) {
        res.status(400).send('No celebrities in the list to remove');
    } else {
        // Check if selected celebrity is in the favorite list
        var remove = false;
        if (username.favourite.includes(req.body.favourite)) {
            remove = true;
        }

        if (!remove) {
            res.status(401).send('Selected celebrity is not in favorite list');
        } else {
            var query = { $pull: {favourite: req.body.favourite} };
            favourite.Favourite.updateOne( {username: req.body.username}, query, function(error, result){
                if (error) {
                    console.error('Cannot remove celebrity from the list', error);
                    res.status(401).send('error removing a celebrity from the favorite list');
                } else {
                    res.send('Successfully removed from favorite list');
                }
            })
        }
    }
})

router.post('/isFavourite', urlencodedParser, async(req, res) => {
    console.log(req.body.username);
    // if selected celebrity is in database turn favorite button On and if not turn off the button
    let isFavourite = await favourite.Favourite.findOne({
        username: req.body.username,
        favourite: req.body.url
    });
    if (isFavourite) {
        res.send('Favorite button On');
    } else {
        res.status(400).send('Favorite button Off');
    }
})

router.post('/listFavourite', urlencodedParser, async(req, res) => {
    favourite.Favourite.findOne({
        username: req.body.username
    }).then(function(list) {
        if (list) {
            res.send(list);
        } else {
            console.error('User does not have favourite list');
        }
    })
})

router.post('/getImgPath', urlencodedParser, async(req, res) => {
    celebrity.Celebrity.findOne({
        name : req.body.click
    }, {
        "imgPath" : 1
    }).then(function(path) {
        if (path) {
            res.send(path);
        } else {
            console.error('Such celebrity does not exist');
        }
    })
})

module.exports = router;
