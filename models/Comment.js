var mongoose = require('mongoose');
var User = require('../models/User');
var Comment = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  postedDate: {
    type: Number,
    required: true
  },
  lastUpdatedDate: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  numOfLikes: {
    type: Number,
    required: true,
    default: 0
  },
  numOfDislikes: {
    type: Number,
    required: true,
    default: 0
  }
});
module.exports = mongoose.model('Comment', Comment);
