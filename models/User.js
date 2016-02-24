var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  handle: {
    type: String,
    require: true
  }
});

//option can setup email, will try this later
User.plugin(passportLocalMongoose, {});
module.exports = mongoose.model('User', User);
