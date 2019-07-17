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

    var crawler = new Crawler({
        maxConnections : 10,
        
        callback : function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                var list = $("div.div-col> ul> li>[href *= 'wiki']a").toArray();
                var celebName = [];
                var stars = [];

                // Get a list of celebrity names
                list.map(celeb => {
                    celebName.push(celeb.attribs.title);
                })

                // Transfrom names into Celebrity schema and store it into stars 
                celebName.map(star => {
                    var celebSchema = {name: `${star}`};
                    stars.push(celebSchema)
                })

                //Insert to the database
                Celebrity.collection.insert(stars, function (err, docs) {
                    if (err) { 
                        console.error('celebs are already in the database');
                    } else {
                        console.log("Celebs are inserted to collection");
                    }
                });
            }   
            done();
        }
    });

    crawler.queue('https://en.wikipedia.org/wiki/List_of_South_Korean_idol_groups_(2010s)');
}