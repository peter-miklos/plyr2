var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/index', function(req, res, next) {
  models.Event.findAll({}).then(function(events) {
    models.Sport.findAll({}).then(function(sports) {
      res.render('events/index', {title: "List of events", events: events, sports: sports});
    })
  })
});

router.get('/new', function(req, res, next) {
  models.Sport.findAll({}).then(function(sports) {
    res.render('events/new', {title: "Create new event", sports: sports});
  })
});

router.post('/new', function(req, res, next) {
  models.Event.create({
    skill: parseInt(req.body.skill),
    eventDate: req.body.date,
    eventTime: req.body.time,
    location: req.body.location,
    description: req.body.description,
    SportId: parseInt(req.body.sport_select),
    UserId: req.session.user.id
  }).then(function(event) {
    res.redirect('/events/index');
  });
});

router.get('/:id/show', function(req, res, next) {
  var id = req.params.id
  models.Event.find({where: { id: req.params.id}}).then(function(event) {
    res.render('events/show', {title: "Event", event: event});
  })
});

router.get("/:id/requests/new", function(req, res, next) {
  var eventId = req.params.id
  res.render('events/requests/new', {title: "Create new request", eventId: eventId})
});

router.post("/:id/requests/index", function(req, res, next) {
  models.Status.find({where: {name: "Open"}}).then(function(status) {
    models.Request.create({
      comment: req.body.comment,
      EventId: req.params.id,
      StatusId: status.id
    }).then(function(){
      res.redirect('/events/requests/index');
    });
  })
});

router.get("/requests/index", function(req, res, next) {
  res.render('events/requests/index')
});

module.exports = router;
