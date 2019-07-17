const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Crawler = require('crawler');

var Schema = mongoose.Schema;

//Celebrity schema
var CelebritySchema = new Schema({
    name: {type: String, required: true, unique: true},
    gender: String,
    albums: Number,
    imgPath: [{
        type: String,
        index: true
    }]
});

CelebritySchema.plugin(uniqueValidator);

var Celebrity = mongoose.model('Celebrity', CelebritySchema, 'Celebrity');  
module.exports.Celebrity = Celebrity;

module.exports.init = function(){
    var celebs = [{name: 'BTS', gender: 'M', imgPath: 
                    ['client/src/BTS1.jpg', 'client/src/BTS2.jpeg', 'client/src/BTS3.jpg', 'client/src/BTS4.jpg']},
                  {name: 'IZ*ONE', gender: 'F',imgPath: 
                    ['client/src/IZ*ONE1.jpg', 'client/src/IZ*ONE2.jpg', 'client/src/IZ*ONE3.jpeg']},
                  {name: 'TWICE', gender: 'F', imgPath: ['client/src/TWICE1.jpg']}]

    Celebrity.collection.insert(celebs, function (err, docs) {
        if (err) { 
            console.error('celebs are already in the database');
        } else {
            console.log("Celebs are inserted to collection");
        }
    });  
    
    var crawler = new Crawler({
        maxConnections : 10,
        
        callback : function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                var list = $("div.div-col> ul> li>[href *= 'wiki']a").toArray();
                var stars =[]
                list.map(celeb => {
                    stars.push(celeb.attribs.title);
                })
                console.log(stars);
            }
            done();
        }
    });

    crawler.queue('https://en.wikipedia.org/wiki/List_of_South_Korean_idol_groups_(2010s)');

}
