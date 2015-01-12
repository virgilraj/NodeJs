var http = require("http");
var url = require("url");
var express = require('express')
var app = express();

var fileio = require("./fileio.js").myFileIo;
var github = require("./github.js");

//using express
function start(route) {
    function onRequest(request, response) {

        github.getGitToken();
        //app.get('/ReadFile', function (req, res) {
        //    //console.log(req.query.fname);
        //    fileio.startRead(req.query.fname + '.txt', function (err, res1) {
        //        res.send(res1)
        //    });
        //});

        //app.get('/WriteFile', function (req, res) {
        //    //console.log(req.query.fname);
        //    fileio.startWrite(req.query.fname + '.txt', function (err, res1) {
        //        res.send(res1)
        //    });
        //});
    }

    app.listen(8888, onRequest);

    console.log("Server has started.");
}

/// using http 

//function start(route) {
//    function onRequest(request, response) {
//        var pathname = url.parse(request.url).pathname;
//        console.log("Request for " + pathname + " received.");
//        ex.get('/Read', function (req, res) { });
//        //route(pathname);
//        //var fle = new fileio();
//        response.writeHead(200, { "Content-Type": "text/plain" });
//        response.write('weeeee');
//        fileio.startRead('helloworld.txt', function (err, res) {
//            response.write(res);
//            response.end();
//        });
        
//        response.write("Hello World"); //+ fileio.startRead('helloworld.txt');
//        //response.end();
//    }

//    http.createServer(onRequest).listen(8888);
//    console.log("Server has started.");
//}

exports.start = start;