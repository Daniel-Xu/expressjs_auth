/**
 * import lib
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * import route
 */
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api');


/**
 * import model
 */
var User = require('./models/User');

var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect( process.env.MONGOLAB_URI|| 'mongodb://localhost/blogger' );
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
//passport local strategy
passport.use(User.createStrategy());

app.use('/', routes);
app.use('/users', users);
app.use('/', auth);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
  // app.use(function(err, req, res, next) {
    // res.status(err.status || 500);
    // res.render('error', {
      // message: err.message,
      // error: err
    // });
  // });
// }

// token error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(err.code).send(err);
  }
  res.status(err.status || 500).send(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
