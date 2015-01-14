var config = require('./config.json');
var express = require('express'),
app = express();

var passport = require('passport')
  , util = require('util')
  , BitbucketStrategy = require('passport-bitbucket').Strategy;
var session = require('express-session');

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


var resp = {};

passport.use(new BitbucketStrategy({
    consumerKey: config.bitbucket.clientKey,
    consumerSecret: config.bitbucket.clientsecret,
    callbackURL: config.calbackurl
},
  function (token, tokenSecret, profile, done) {
      resp.token = token;
      resp.tokenSecret = tokenSecret;
      resp.user = profile._json.user;
      resp.repos = profile._json.repositories;
      resp.raw = profile._raw;
      return done(null, resp);
  }
));

app.get('/bitbucket', passport.authenticate('bitbucket'));

app.get(config.callbackmethod, passport.authenticate('bitbucket', { failureRedirect: '/login' }),
  function (req, res) {
      // Successful authentication, redirect home.
      res.send(config.scriptblock.replace('{script}', JSON.stringify(resp)));
  });

app.get('/', function (req, res) {
    res.send('Hello<br><a href="/bitbucket">Log in with BitBucket</a>');
});

app.listen(config.port);
console.log('Server satarted');


