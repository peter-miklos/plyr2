var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('events/new', {  title: "Create event" });
});

router.get('/show', function(req, res, next) {
  var eventID = req.query.id
  var event = retreive the data from DB by using event ID
  res.render("events/show", { event })
});

router.post('/', function(req, res, next) {
  req.session.sport = req.body.sport;
  res.redirect('/events');
});

module.exports = router;
