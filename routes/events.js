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
  if (req.session.user) {
  models.Sport.findAll({}).then(function(sports) {
    res.render('events/new', {title: "Create new event", sports: sports, flash: req.flash("dateError")});
  })
} else {
  req.flash("loginError", "You need to be logged in");
  res.redirect('/sessions/login')
}
});

router.post('/new', function(req, res, next) {
  var today = new Date();
  today.setHours(today.getHours());
 if ( today < new Date(req.body.date + "T" + req.body.time).valueOf()) {
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
 } else {
   req.flash("dateError", "Event time can't be earlier than now");
   res.redirect('/events/new');
 }
 });

router.get('/:id/show', function(req, res, next) {
  models.Event.find({where: { id: req.params.id}}).then(function(event) {
    models.Sport.find({where: { id: event.SportId}}).then(function(sport) {
      if (req.session.user) {
        models.Request.find({where: {
          EventId: event.id,
          UserId: req.session.user.id
        }}).then(function(request) {
          res.render('events/show', {title: "Event", event: event, sport: sport, request: request});
        })
      } else {
        res.render('events/show', {title: "Event", event: event, sport: sport});
      }
    });
  });
});

router.get("/:id/requests/new", function(req, res, next) {
  if (req.session.user) {
  var eventId = req.params.id
  res.render('events/requests/new', {title: "Create new request", eventId: eventId})
} else {
  req.flash("loginError", "You need to be logged in");
  res.redirect('/sessions/login')
}
});

router.post("/:id/requests/new", function(req, res, next) {
  models.Status.find({where: {name: "Open"}}).then(function(status) {
    models.Request.create({
      comment: req.body.comment,
      EventId: req.params.id,
      StatusId: status.id,
      UserId: req.session.user.id
    }).then(function(){
      res.redirect('/sessions/' + req.session.user.id + '/requests/index');
    });
  })
});

router.post("/search", function(req, res, next) {
  console.log(req.body.sport_select);
    models.Event.findAll({ where: { SportId: req.body.sport_select }}).then(function(selectedEvents) {
      models.Sport.findAll({}).then(function(sports) {
        var events = selectedEvents.filter(function(e) { return (e.eventDate >= new Date(req.body.date_select_search)) });
      res.render('events/index', {title: "List of events", events: events, sports: sports});
      });
  })
});

router.get('/search', function(req, res, next) {
    models.Sport.findAll({}).then(function(sports) {
      res.render('events/search', {title: "Search for events", sports: sports});
  })
});

router.get("/requests/index", function(req, res, next) {
  if (req.session.user) {
  res.render('events/requests/index')
} else {
  req.flash("loginError", "You need to be logged in");
  res.redirect('/sessions/login')
}
});

module.exports = router;
