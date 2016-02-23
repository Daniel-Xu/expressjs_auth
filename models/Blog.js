var mongoose = require('mongoose');
var User = require('../models/User');
var Comment = require('../models/comment');
var Tag = require('../models/tag');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  publishedDate: Number,
  createdDate: {
    type: Number,
    required: true
  },
  lastUpdatedDate: {
    type: Number,
    required: true
  },
  // N.B.
  author: {
    type: ObjectId, ref: 'User',
    required: true,
    meta: {
      _id: {
        type: Number,
        index: true,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      }
    }
  },
  // N.B.
  tags: {
    type: ObjectId, ref: 'Tag',
    meta: {
      _id: {
        type: Number,
        required: true,
        index: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      }
    }
  },
  content: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  },

  // N.B.
  comments: {
    type: ObjectId, ref: 'Comment',
    meta: {
      _id: {
        type: Number,
        required: true,
        index: true,
        unique: true
      },
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
        type: ObjectId, ref: 'User',
        required: true,
        meta: {
          _id: {
            type: Number,
            required: true,
            index: true,
            unique: true
          },
          handle: {
            type: String,
            required: true
          }
        }
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
    }
  },

  numOfViews: {
    type: Number,
    required: true,
    default: 0
  },
  numOfUpVotes: {
    type: Number,
    required: true,
    default: 0
  },
  numOfDownVotes: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Blog', Blog);
