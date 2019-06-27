const express = require('express');
const bodyParser = require('body-parser');
const favorite = require('../db/favorite');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addFav', urlencodedParser, async(req, res) => {
    console.log(req.body);
    let username = await favorite.Favorite.findOne({
        username: req.body.username
    });
    if (!username) {
        var newUser = new favorite.Favorite(req.body);
        newUser.save().then(item => {
            res.send('added to favorite')
        }) 
    } else {
        // if user have been used favorite before update the list
        
        let userfav = await favorite.Favorite.findOne(
            {username: req.body.username, favorite : req.body.favorite}
        );
        if(!userfav){
            var newVal = {$push: {favorite: req.body.favorite}};
            favorite.Favorite.updateOne({username: req.body.username}, newVal, function(err, result) { 
                if (err) { 
                    console.log('Cannot update favorite already in db')
                    console.log(err)
                    res.status(400).send('update fail');
                }else{
                    console.log('document updated');
                    res.send('update successful');
                }
            })
        } else{
            res.status(400).send('already in favorite');
        }
    }
});

module.exports = router;
