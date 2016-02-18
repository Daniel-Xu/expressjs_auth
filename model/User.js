var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    index: true,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  JWT: String
});

module.exports = mongoose.model('User', userSchema);
