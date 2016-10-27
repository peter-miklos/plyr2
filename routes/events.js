var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/index', function(req, res, next) {
  models.Event.findAll({}).then(function(events) {
    // res.json(events)
    res.render('events/index', {title: "List of events", events: events});
  })
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
    res.redirect('/events/index');
  });
});

router.get('/:id/show', function(req, res, next) {
  var id = req.params.id
  res.render('events/show', {title: "Event"});
});



router.get("/:id/requests/new", function(req, res, next) {
  eventID = req.params.id
  res.render('events/requests/new', {title: "Create new request"})
});

router.post("/requests/index", function(req, res, next) {
  models.Request.create({
    comment: req.body.comment,
    EventId: eventID
  }).then(function(){
    res.redirect('/events/requests/index');
  });
});

router.get("/requests/index", function(req, res, next) {
  res.render('events/requests/index')
});



module.exports = router;
