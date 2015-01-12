
var express = require('express'),
app = express();
var GitHubApi = require("github");


var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

github.authenticate({
    type: "basic",
    username: 'virgilraj',
    password: 'virgil254617'
});

app.get('/', function (req, res) {
    res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.listen(8888);
console.log('Server satarted');

app.get('/auth', function (req, res) {
    var gitRes = {};
    github.authorization.getAll({ id: "virgilraj" }, function (err, authRes) {
        gitRes.authRes = authRes;
        //console.log(JSON.stringify(res));

        github.repos.getAll({}, function (err1, respoRes) {
            gitRes.respoRes = respoRes;
            //console.log(JSON.stringify(gitRes));
            res.send(JSON.stringify(gitRes));

            //Get branches will return sha - using this sha we can get commits

            github.repos.getBranches(
            {
                user: 'virgilraj',
                repo: 'Xaviers'
            },
            function (errr, fileRes) {
                if (errr != null) {
                    console.log(JSON.stringify(errr))
                }
                else {
                    console.log(JSON.stringify(fileRes))
                }
            });
        });


        

        console.log('sdf');
        //console.log(JSON.stringify(err1));
    });
});

