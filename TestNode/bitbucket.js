﻿var config = require('./config.json');
var express = require('express'),
app = express();

//Start : Bitbucket
var passport = require('passport')
  , util = require('util')
  , BitbucketStrategy = require('passport-bitbucket').Strategy;
var session = require('express-session');

var resp = {};

//This setting is required to enable passport authentication
app.use(express.static('public'));
    app.use(session({
        secret: 'SECRET', saveUninitialized: true,
        resave: true
    }))
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

passport.use(new BitbucketStrategy({
    consumerKey: config.bitbucket.clientKey,
    consumerSecret: config.bitbucket.clientsecret,
    callbackURL: config.bitbucket.callbackmethod
},
  function (token, tokenSecret, profile, done) {
      resp.token = token;
      resp.tokenSecret = tokenSecret;
      resp.user = profile._json.user;
      resp.repos = profile._json.repositories;
      resp.raw = profile._raw;
      done(null, resp);
  }
));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.send("<script type=\"text/javascript\">document.location.href = '" + config.redirectUrl + "'</script> ");
}

//Get bitbucket response from seson - nodejs passport defult session
app.get('/getbitbucket', ensureAuthenticated, function (req, res) {
    res.send(JSON.stringify(req.user));
});

app.get('/auth/bitbucket', passport.authenticate('bitbucket'));

//Bitbucket callback method
app.get(config.bitbucket.callbackmethod, passport.authenticate('bitbucket', { failureRedirect: '/login' }),
    function (req, res) {
        res.send("<script type=\"text/javascript\">document.location.href = '" + config.redirectUrl + "'</script> ");
    });

//End :: bitbucket

//Start:: Github
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

var oauth2 = require('simple-oauth2')({
    clientID: config.github.clientKey,
    clientSecret: config.github.clientsecret,
    site: config.github.site,
    tokenPath: config.github.tockenpath
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
    redirect_uri: config.github.calbackurl,
    scope: ["user", "public_repo", "repo", "repo:status", "gist"]
});

// Initial page redirecting to Github
app.get('/auth/github', function (req, res) {
    console.log(authorization_uri);
    res.redirect(authorization_uri);
});

//Pass the github token get response
app.get('/getgithub', function (req, res) {
    var token = req.query.token;
    var gitRes = {};
    if (typeof token !== 'undefined' && token) {
        github.authenticate({
            type: "oauth",
            token: token
        });

        github.repos.getAll({}, function (err1, respoRes) {
            gitRes.respoRes = respoRes;
            res.send(JSON.stringify(gitRes));

        });
    }
    else {
        res.send('');
    }
});

//Github callback method
app.get(config.github.callbackmethod, function (req, res) {
    var code = req.query.code;
    console.log('/callback');
    oauth2.authCode.getToken({
        code: code,
        redirect_uri: config.github.calbackurl
    }, saveToken);

    function saveToken(error, result) {
        if (error) { console.log('Access Token Error', error.message); }
        token = oauth2.accessToken.create(result);
        var tok = token.token;
        res.send("<script type=\"text/javascript\">document.location.href = '" + config.redirectUrl + tok + " '</script> ");
    }
});

//End :: Github

app.get('/', function (req, res) {
    res.send('Hello<br><a href="/bitbucket">Log in with BitBucket</a>');
});

app.listen(config.port);
console.log('Server satarted');


