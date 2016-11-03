var express = require('express');
var router = express.Router();
var models = require("../models");


router.get('/index', function(req, res, next) {
  models.Sport.findAll({}).then(function(sports) {
    models.Status.findAll({}).then(function(allStatus) {
      var statuses = allStatus.filter(function(e) {return e.name === "Accepted"})
      models.Request.findAll({where: {
        StatusId: {
          $any: statuses.map(function(e) {return e.id})
        }
      }}).then(function(requests) {
        models.Event.findAll({
        order: '"createdAt" DESC'
      }).then(function(allEvents) {
          var events = allEvents.filter(function(e) { return (e.eventDate >= new Date()) });
          res.render('events/index', {title: "List of events", events: events, sports: sports});
        })
      })
    })
  })
});

router.get('/new', function(req, res, next) {
  if (req.session.user) {
  models.Sport.findAll({order: '"name" ASC' }).then(function(sports) {
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
     eventDate: new Date(req.body.date + "T" + req.body.time),
     eventTime: req.body.time,
     location: req.body.location,
     description: req.body.description,
     SportId: parseInt(req.body.sport_select),
     UserId: req.session.user.id,
     longitude: req.body.cityLng,
     latitude: req.body.cityLat
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
      models.User.find({where: { id: event.UserId}}).then(function(eventOwner) {
        if (req.session.user) {
          models.Request.find({where: {
            EventId: event.id,
            UserId: req.session.user.id
          }}).then(function(request) {
            res.render('events/show', {title: "Event", event: event, sport: sport, owner: eventOwner, request: request});
          })
        } else {
          res.render('events/show', {title: "Event", event: event, sport: sport, owner: eventOwner});
        }
      })
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

router.get("/getEventLocations", function(req, res, next) {
  var eventLocations = [];
  models.Sport.findAll({}).then(function(sports) {
    models.Status.findAll({}).then(function(allStatus) {
      var statuses = allStatus.filter(function(e) {return e.name === "Accepted"})
      models.Request.findAll({where: {
        StatusId: {
          $any: statuses.map(function(e) {return e.id})
        }
      }}).then(function(requests) {
        models.Event.findAll({}).then(function(allEvents) {
          var events = allEvents.filter(function(e) { return (e.eventDate >= new Date()) });
          events.forEach(function(event, index){
            var sportIndex = sports.findIndex(function(element) { return element.id === event.SportId})
            var url = '/static/images/' + sports[sportIndex].name + '.png';
            var minutes = event.eventDate.getMinutes() < 10 ? "0" + event.eventDate.getMinutes() : event.eventDate.getMinutes()
            var eventInfo = "<strong>" + sports[sportIndex].name + "</strong>"
                            + "<br/> Skill level: " + event.skill
                            + "<br/> Date: <strong>" + new Date(event.eventDate).toDateString() + "</strong>"
                            + "<br/> Time: <strong>" + event.eventDate.getHours() + ":" + minutes + "</strong>"
                            + "<br/> <a href='/events/" + event.id
                            + "/show'>Show Event </a>"
            eventLocations.push([event.latitude, event.longitude, url, index+1, eventInfo, event.eventDate.setHours(0,0,0,0,0)])
          })
          res.send(eventLocations)
        })
      })
    })
  })
})

module.exports = router;
