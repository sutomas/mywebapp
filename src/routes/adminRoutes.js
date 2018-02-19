"use strict";

var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
        {
            title: "Como sacarle mayor partido a su imagen",
            author: "Laurel Herman",
            id: 1,
            authorid: 1,
            cover: "1001.jpg",
            read: false
        },
        {
            title: "Maunal de instrucoes para homens de sucesso",
            author: "Paula Bobone",
            id: 2,
            authorid: 2,
            cover: "1002.jpeg",
            read: false
        },
        {
            title: "O poder da Mente",
            author: "Godefroy e Stevens",
            id: 3,
            authorid: 3,
            cover: "1003.jpeg",
            read: false
        },
        {
            title: "O poder do corpo",
            author: "Vernon Coleman",
            id: 4,
            authorid: 4,
            cover: "1004.jpg",
            read: false
        }
    ];

var authors = [
        {
            author: "Laurel Herman",
            category: "Desenvolvimento pessoal",
            photo: "7001.jpeg",
            read: false
        },
        {
            author: "Paula Bobone",
            category: "Desenvolvimento pessoal",
            photo: "7002.jpeg",
            read: false
        },
        {
            author: "Godefroy e Stevens",
            category: "Desenvolvimento pessoal",
            photo: "7003.jpeg",
            read: false
        },
        {
            author: "Vernon Coleman",
            category: "Desenvolvimento pessoal",
            photo: "7004.jpeg",
            read: false
        }
    ];


var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        //db.close();
                    }
                    );
                        db.close();
            });

            //res.send('inserting books');
        });
    adminRouter.route('/addAuthors')
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('authors');
                collection.insertMany(authors,
                    function (err, results) {
                        res.send(results);
                        //db.close();
                    }
                    );
                        db.close();
            });

            //res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;