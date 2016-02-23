var express = require('express');
var router = express.Router();
var AuthService = require('./auth.service');


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
})
module.exports = router;
