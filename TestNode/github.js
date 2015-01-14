
var express = require('express'),
app = express();
var GitHubApi = require("github");


var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

//github.authenticate({
//    type: "basic",
//    username: 'username',
//    password: 'password'
//});

app.get('/', function (req, res) {
    res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.listen(8888);
console.log('Server satarted');

app.get('/Callback', function (req, res) {
    res.send("Hefdsdfsdfsdf");
});


app.get('/auth', function (req, res) {
    github.authenticate({
        type: "basic",
        username: 'softcrylic.testautomation@gmail.com',
        password: 'Softcrylic123'
    }, function (err, rrss) {
        console.log(JSON.stringify(rrss));
    });

    //console.log(res);

    var gitRes = {};
    //github.authorization.create({
    //    scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
    //    note: 'localhost:8888',
    //    note_url : 'http://localhost:8888'
    //}, function (err, authRes) {
    //    if (err != null)
    //        console.log(JSON.stringify(err));
    //    else
    //    console.log(JSON.stringify(authRes));
    //});

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

        console.log(req.query.id);
        //console.log(JSON.stringify(err1));
    });
});

