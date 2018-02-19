"use strict";

var cats = require("./cats");

console.log("O MEU GATO!");
console.log("Nome: " + cats.name);
console.log("Cor: " + cats.color);
console.log("Dono: " + cats.dono);

//1 Instalar o express
//Apontar para o express
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");


//2 Criar uma instância do express
var app = express()

//3 Criar a porta onde o express vai listens
//var port = 5000;
//Usa a porta 5000 se nao existir a 3000
var port = process.env.port || 5000;

//Criar uma variavel nav para nao ter de mudar tudo em todo o lado
//passa-la em bookRoutes e authorRoutes
var nav = [{
        Link: '/Books',
        Text: 'Books'
    }, {
        Link: '/Authors',
        Text: 'Authors'
    }];

//Routing
//var bookRouter = express.Router();
//var bookRouter = require("./src/routes/bookRoutes")(nav);

var authorRouter = require("./src/routes/authorRoutes")(nav);
var bookRouter = require("./src/routes/bookRoutes")(nav);
var authorRouter = require("./src/routes/authorRoutes")(nav);
var adminRouter = require("./src/routes/adminRoutes")(nav);
var authRouter = require("./src/routes/authRoutes")(nav);

//5 Static files
//Set up a static directory to read the css files
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: "library"}));

//(app) porque passport.js contem app.use
require("./src/config/passport")(app);

//Aternativa caso não encontre os css em public
//app.use(express.static("src/views"));
//indicar onde estão as views
app.set("views", "./src/views");
//indicar q vamos usar jade
//app.set("view engine", "jade");
//var handlebars = require ("express-handlebars");
//app.engine(".hbs", handlebars({extname: ".hbs"}));
//app.set("view engine", "hbs");
app.set("view engine", "ejs");

//Precisamos de dizer a app que vamos usar o router books
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);


/*3 function (err) é um callback (It's just a function that app.listen is going to execute when it's doing what is doing) */
app.listen(port, function (err) {
    console.log("Running server on port " + port);
});

//4 Simple routing - "/" é a home route, req=request e res=response
app.get("/", function (req, res) {
//    res.send("Hello!");
//list q está em index.jade num ciclo
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get("/cats", function (req, res) {
    res.send("Hello from cats!");
});

