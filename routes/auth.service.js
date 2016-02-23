var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var config = require('../config/config');
var expressJWT = require('express-jwt');
var User = require('../models/User');

var validateJWT = expressJWT({
  secret: config.jwtSecret
});

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(username, role) {
  var payload = {};
  payload.username = username;
  if (role) {
    playload.role = role;
  }
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * check if use is authenticated
 *
 * @name isAuthenticated
 1* @function
 * @param {} req
 * @param {} res
 * @param {} next
 */
function isAuthenticated(req, res, next) {
   return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('token')) {
        req.headers.authorization = 'Bearer ' + req.query.token;
      }
      validateJWT(req, res, next);
    })
   .use(function(req, res, next) {
      User.findByUsername(req.user.username, function(err, user) {
        if (err) {
          return next(error)
        }
        if (!user) {
          return res.status(400).send({ message: 'User no longer exists.' });
        }
        req.user = user;
        next();
      });
    });
}

exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;

