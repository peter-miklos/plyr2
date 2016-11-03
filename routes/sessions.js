var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');
var session = require('express-session');

router.get('/login', function(req, res, next) {
  res.render('sessions/login', { title: 'User Login', flash: req.flash('loginError') });
});

router.post('/login', function(req, res, next) {
    models.User.findOne({
    where: { email: req.body.email }
  })
    .then(function(user){
      if (models.User.checkPassword(user, req.body.password))
      {
        req.session.user = user;
        res.redirect('/');
      } else {
        req.flash("loginError", "Incorrect email or password");
        res.redirect('/sessions/login');
      }
    })
    //this is for catching exceptions from object NOT incorrect details
    .catch(function(error) {
      req.flash("loginError", "Exception details: " + error);
      res.redirect('/sessions/login');
    });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash("logout", "Successfully logged out!");
  res.redirect('/');
});

router.get('/:id/requests/index', function(req, res, next) {
  if (req.session.user) {
    models.Sport.findAll({}).then(function(sports) {
      models.Event.findAll({}).then(function(events) {
        models.Request.findAll({
          where: {UserId: req.session.user.id},
          order: '"createdAt" DESC'
          }).then(function(myRequests) {
          models.Status.findAll({}).then(function(statuses) {
            models.User.findAll({}).then(function(users) {
              models.Event.findAll({where: {UserId: req.session.user.id}}).then(function(myEvents) {
                if (myEvents.length === 0) {
                  res.render("events/requests/index", {myRequests: myRequests,
                                                      receivedRequests: [],
                                                      title1: "Received requests",
                                                      title2: "Sent requests",
                                                      events: events,
                                                      sports: sports,
                                                      statuses: statuses,
                                                      users: users})
                } else {
                  models.Request.findAll({where: {
                      EventId: {
                        $any: myEvents.map(function(elem) { return elem.id })
                      }
                  },
                  order: '"createdAt" DESC'}).then(function(receivedRequests) {
                    res.render("events/requests/index", {myRequests: myRequests,
                                                        receivedRequests: receivedRequests,
                                                        title1: "Received requests",
                                                        title2: "Sent requests",
                                                        events: events,
                                                        sports: sports,
                                                        statuses: statuses,
                                                        users: users})
                  })
                }
              })
            })
          })
        })
      })
    })
  } else {
    req.flash("loginError", "You need to be logged in");
    res.redirect('/sessions/login')
  }



})

router.post("/:userId/requests/:requestId/complete", function(req, res, next) {
  var requestId = req.params.requestId;
  var userId = req.params.userId;
  var acceptedStatus, openStatus, rejectedStatus;
  models.Status.findAll({}).then(function(statuses) {
    acceptedStatus = statuses.find(function(e) {return e.name === req.body.action})
    openStatus = statuses.find(function(e) {return e.name === "Open"})
    rejectedStatus = statuses.find(function(e) {return e.name === "Rejected"})
  })
  if (req.body.action === "Accepted") {
    models.Request.find({where: {id: requestId}}).then(function(acceptedRequest) {
      if(acceptedRequest) {
        acceptedRequest.updateAttributes({
          StatusId: acceptedStatus.id
        }).then(function(){
          models.Event.find({where: {id: acceptedRequest.EventId}}).then(function(eventItem) {
            eventItem.updateAttributes({
              RequestId: acceptedRequest.id
            }).then(function() {
              models.Request.findAll({
                where: {
                  StatusId: openStatus.id,
                  EventId: eventItem.id
                }
              }).then(function(requests) {
                requests.forEach(function(request, index) {
                  request.updateAttributes({
                    StatusId: rejectedStatus.id
                  }).then(function(){})
                })
              })
            })
          })
        })
      }
    })
    res.redirect("/sessions/" + userId + "/requests/index");
  }
  else if (req.body.action === "Rejected") {
    models.Status.find({where: {name: req.body.action}}).then(function(status) {
      models.Request.find({where: {id: requestId}}).then(function(request) {
        if(request) {
          request.updateAttributes({
            StatusId: status.id
          }).then(function() {
            res.redirect("/sessions/" + userId + "/requests/index");
          })
        }
      })
    })
  }
})

module.exports = router;
