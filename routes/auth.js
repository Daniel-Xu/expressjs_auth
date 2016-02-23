var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');
var AuthService = require('./auth.service');

// login form
router.get('/register', function(req, res) {
  res.render('register');
});

// signup
router.post('/register', function(req, res, next) {
  //from mongoose plugin
  User.register(new User({
    //username is defined by local mongoose plugin
    username: req.body.username,
    handle: req.body.handle
  }), req.body.password, function(err, user) {
    if (err) {
      return res.status(401).send(err);
    }
    var token = AuthService.signToken(user.username);
    user = user.toObject();
    delete user.hash;
    delete user.salt;
    res.send({ token: token, user: user });
  });
});

// login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    session: false
  }, function(err, user, msg) { // this callback is used when you define local strategy
    var err = err || msg;
    if (err) {
      // password is wrong
      return res.status(401).send(err);
    }

    // no err, but user is not found, wierd case.
    if (!user) {
      return res.status(404).send({ message: 'Something went wrong, please try again.'});
    }
    var token = AuthService.signToken(user.username);
    user = user.toObject();
    delete user.hash;
    delete user.salt;
    res.send({user: user, token: token});
  })(req, res, next);
});

// logout
router.get('/logout', function() {
  req.logout();
  res.redirect('/');
});

module.exports = router;

