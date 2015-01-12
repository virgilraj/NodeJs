var server = require("./nodeserver");
var router = require("./router");
//var router = require("./fileio");

server.start(router.route);