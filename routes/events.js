var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  sport = req.session.sport;
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('events/new', {  title: "Create event" });
});

router.post('/', function(req, res, next) {
  req.session.sport = req.body.sport;
  res.redirect('/events');
});

module.exports = router;
