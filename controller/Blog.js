var Blog = require('../models/Blog');
exports.get = function(req, res, next) {
  Blog.findById(req.params.blog_id, function(err, blog) {
    if (err) {
      // why we need to use res.status().send
      // because it's easy to customized the error code and msg
      // instead of throwing all the error to production err handler
      res.status(404).send(err);
    }

    res.status(200).json(blog);
  })
}

