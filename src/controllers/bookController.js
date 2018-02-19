'use strict';

var mongodb = require("mongodb");
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav){
    var middleware = function (req, res, next){
        //if (!req.user) {
          //  res.redirect("/");
        //} comentado so para nao estar a logar todo o tempo
        next();
    };
    var getIndex = function (req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("books");
                //collection.find({}) podia por aqui uma query ou deixar assim. vai listar tudo
                collection.find({}).toArray(
                    function (err, results) {
                        res.render("bookListView", {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                });
            });
        };
    
    var getById = function (req, res) {
            var id = new objectId(req.params.id);
            var url =
            'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("books");
                //collection.find({}) podia por aqui uma query ou deixar assim. vai listar tudo
                collection.findOne({_id: id},//query ({})
                    function (err, results) {
                        bookService.getBookById(results.bookId,
                            function(err, book){
                                results.book = book;
                                res.render("bookView", {
                                    title: 'Books',
                                    nav: nav,
                                    book: results,
                                });
                        });
                    }//function
                    );//collection

            });//mongodb

        };
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;

