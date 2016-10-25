var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
res.render('new', {
  title: "Create event"
});
});

router.post('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
