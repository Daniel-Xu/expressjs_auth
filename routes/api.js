var express = require('express');
var router = express.Router();
var AuthService = require('./auth.service');
var blogController = require('../controller/blog');

router.get('/', function(req, res) {
  res.send({
    version: 'v1'
  });
});

router.get('/secret', AuthService.isAuthenticated(), function(req, res) {

  res.send({
    version: 'v1',
    user: req.user
  });
});

router.route('/blogs/:blog_id')
  .get(blogController.get)

module.exports = router;
