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
    var bookService = require ("../services/goodreadsService")();
    var bookController = require ("../controllers/bookController")(bookService, nav);
    /*bookRouter.use(function (req, res, next){
        if (!req.user) {
            res.redirect("/");
        }
        next();
    });*/
    bookRouter.use(bookController.middleware);
    
//encaminhamento books/
    bookRouter.route("/")
        .get(bookController.getIndex);

//encaminhamento books/single
    bookRouter.route("/:id")
            .get(bookController.getById);//.get
    
    return bookRouter;
    
};//nav

//module.exports = bookRouter;
module.exports = router;


