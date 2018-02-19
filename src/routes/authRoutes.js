var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    'use strict';
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user,
                    function (err, results) {
                        req.login(results.ops[0], function () {
                            res.redirect('/auth/profile');
                        });
                    });
            });

        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'//se falhar volta para a home
        }), function (req, res) {//se nao falhar function
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');//se nao esta logged volat para "/"
                //so podemos redirect depois de response
            }
            next();//se esta, continua
        })
        .get(function (req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;