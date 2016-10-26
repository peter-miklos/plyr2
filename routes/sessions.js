var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('sessions/login', { title: 'User Login' });
});

router.post('/login', function(req, res, next) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.user = null
  res.redirect('/');
});

module.exports = router;
