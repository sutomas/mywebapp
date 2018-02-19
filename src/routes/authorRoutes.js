'use strict';
var express = require("express");
var authorRouter = express.Router();
//2 Criar uma instância do express
var authorRoutes = express();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

authorRoutes.use(express.static("public"));

//incluir tudo na funcao router q contem a variavel nav
//var router = function (nav) {
var router = function (nav) {

//encaminhamento books/
    authorRouter.route("/")
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("authors");
                //collection.find({}) podia por aqui uma query ou deixar assim. vai listar tudo
                collection.find({}).toArray(
                    function (err, results) {
                        res.render("authorListView", {
                            title: 'Authors',
                            nav: nav,
                            authors: results
                        });
                });
            });
        });

//encaminhamento authors/single
    authorRouter.route("/:id")
            .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url =
            'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("authors");
                //collection.find({}) podia por aqui uma query ou deixar assim. vai listar tudo
                collection.findOne({_id: id},//query ({})
                    function (err, results) {
                        res.render("authorView", {
                            title: 'Authors',
                            nav: nav,
                            author: results
                        });

                    }//function
                    );//collection

            });//mongodb

        });//.get*/
    return authorRouter;
};//nav

//module.exports = bookRouter;
module.exports = router;