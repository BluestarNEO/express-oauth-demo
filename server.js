var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var GitHubStrategy = require('passport-github2').Strategy;
var app = express();

passport.use(new GitHubStrategy({
    clientID: '*', // enter clientId
    clientSecret: '*', // enter clientSecret
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize', user)
  done(null, user);
});

app.use(logger('dev'));

app.use(express.static(__dirname));
app.use(cookieParser());
app.use(session({ secret: 'keyboard giraffe' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/?loggedin=true')
    // res.redirect('http://localhost:8080');
    // res.end(200)
  });

app.get('/auth/github/profile', function(req, res) {
  res.json(req.user)
})

app.listen(3000)
