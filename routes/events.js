var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/index', function(req, res, next) {
  res.render('events/index', {title: "List of events"});
});

router.get('/new', function(req, res, next) {
  res.render('events/new', {title: "Create new event"});
});

router.post('/new', function(req, res, next) {
  models.Event.create({
    skill: req.body.skill,
    eventDate: req.body.date,
    eventTime: req.body.time,
    location: req.body.location,
    description: req.body.comment
  }).then(function(event) {
    // res.json(event);
    res.redirect('/index');
  });
});

router.post('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
