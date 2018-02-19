'use strict';
var express = require("express");
var bookRouter = express.Router();
//2 Criar uma instância do express
var bookRoutes = express();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

bookRoutes.use(express.static("public"));

//incluir tudo na funcao router q contem a variavel nav
//var router = function (nav) {
var router = function (nav) {
    
    bookRouter.use(function (req, res, next){
        if (!req.user) {
            res.redirect("/");
        }
        next();
    });
    
//encaminhamento books/
    bookRouter.route("/")
        .get(function (req, res) {
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
        });

//encaminhamento books/single
    bookRouter.route("/:id")
            .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url =
            'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("books");
                //collection.find({}) podia por aqui uma query ou deixar assim. vai listar tudo
                collection.findOne({_id: id},//query ({})
                    function (err, results) {
                        res.render("bookView", {
                            title: 'Books',
                            nav: nav,
                            book: results,
                        });
                    
                    }//function
                    );//collection

            });//mongodb

        });//.get
    
    return bookRouter;
    
};//nav

//module.exports = bookRouter;
module.exports = router;


