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
                
                list.map(star => {

                    //Find if a celebrity is already in the database 
                    Celebrity.collection.findOne({name : `${star.attribs.title}`}, function(err, result) {
                        if (!result) {
                            //Insert star to the database if duplicate is not found
                            var celebSchema = {name: `${star.attribs.title}`};
                            Celebrity.collection.insertOne(celebSchema, function(fail, suc) {
                                if (fail) {
                                    console.log('Fail to insert the document');
                                } else {
                                    console.log('document updated');
                                }
                            })
                        } else if (result) {
                            // Document is not inserted when duplicate is found
                            console.log('Document will not be updated since duplicate is found')
                        } else if (result){
                            console.log('Error during validating duplicates');
                        }
                    })
                })
            }   
            done();
        }
    });

    crawler.queue('https://en.wikipedia.org/wiki/List_of_South_Korean_idol_groups_(2010s)');
}