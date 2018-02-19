"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var gulpprint = require("gulp-print");
var nodemon = require("gulp-nodemon");

var jsFiles = ["*.js", "src/**/*.js"];

//Nome da task "style"
gulp.task("style", function () {
    'use strict';
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", {
            verbose: true
        }))
        .pipe(jscs());

});

//wiredep gulp-inject
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require("gulp-inject");
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };
    //wirdep vai ver as dependencies em bower.json - indicar esse caminho
    var options = {
        //localizacao de bower.json
        bowerJson: require('./bower.json'),
        //localizacao de bootstrap e font-awesome
        directory: './public/lib',
        //eliminar esta parte nos cominhos que vão ser escritos no html
        ignorePath: "../../public"
    };
    //escreve no html
    //return gulp.src('./src/views/*.html')
    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'))
        .pipe(gulpprint());

});

/*
gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        //enviorment variables
        env: {
            'PORT': 3000
        },
        //ficheiros q o nodemon vai ler para ver se tem alteracoes
        watch: jsFiles
    }

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        })
})

*/

/*quando serve for chamada, style e inject vao correr com ela de modo
assincrono (same time). Garantir que nao dependem uma da outra*/
//tive de tirar o style pq estava a dar erro...
gulp.task('serve', ['inject'], function () {
    //as opcoes vao ter o q o nodemon precisa para correr
    var options = {
        script: 'app.js',
        //1 second
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    }

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        })
})
