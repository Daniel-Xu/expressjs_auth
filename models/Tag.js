var mongoose = require('mongoose');
var User = require('../models/User');

var Tag = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tag', Tag);
