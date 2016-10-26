var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var sport = sess.sport;
  console.log(sport);
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('events/new', {  title: "Create event" });
});

router.post('/', function(req, res, next) {
  sess = req.session;
  sess.sport = req.body.sport;
  res.redirect('/');
});

module.exports = router;
