'use strict';
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/libraryApp';

function teste (){
    console.log("testing...");
    mongodb.connect(url, function (err, db) {
    var collection1 = db.collection("books");
    var collection2 = db.collection("authors");
    var collection3 = db.collection("meuteste");
       // console.log(collection);
    var pb1 = collection1.findOne({"author": "Paula Bobone"},                                     function(err, document1) {
                                    console.log(document1.title);
        var aaa = document1.title;
                                    console.log(document1.author);
        console.log("aaa "+aaa);

        return aaa;
        
                                    });
        //collection3.insert(pb1);
    var pb2 = collection2.findOne({"author": "Paula Bobone"},                                     function(err, document2) {
                                    console.log(document2.author);
                                    console.log(document2.category);
        return document2.author;
        
                                    });
            console.log("pb1"+pb1);
    });//mongo
    //if (pb1 = pb2) {
        //console.log ("true");
    //};
};
                
teste();