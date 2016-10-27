var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('events/new', {  title: "Create new event" });
});

router.post('/new', function(req, res, next) {
  models.Event.create({
    skill: req.body.skill,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    comment: req.body.comment
  }).then(function(user) {
    res.json(user);
  });
  res.redirect('/index');
});

router.post('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
