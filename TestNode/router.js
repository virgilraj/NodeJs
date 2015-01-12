var fileio = require("./fileio");
function route(pathname) {
    //fileio.startWrite("helloworld.txt","welcome virgil");
    console.log("About to route a request for " + pathname);
   // fileio.startRead("helloworld.txt");
}

exports.route = route;