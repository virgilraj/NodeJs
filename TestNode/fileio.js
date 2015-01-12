fs = require('fs');

function startWrite(filename, str) {
    fs.writeFile(filename, str, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });

}

function startRead(filename) {
    return fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);
        return data;
    });
}


var myFileIo = function () {
    return {
        startRead: function (filename, callback) {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                //console.log(data);
                callback(null, data);
            });
        },

        startWrite : function(filename, callback)
        {
            fs.writeFile(filename, "asdad adsad welcome world", function (err) {
                if (err) return console.log(err);

                callback(null, "File created successfully");
            });
        }
    }
}

//exports.startWrite = startWrite;
//exports.startRead = startRead;
module.exports.myFileIo = myFileIo();