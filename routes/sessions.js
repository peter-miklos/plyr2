var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');
var session = require('express-session');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('sessions/login', { title: 'User Login', flash: req.flash('loginError') });
});

router.post('/login', function(req, res, next) {
    models.User.findOne({
    where: { email: req.body.email }
  })
    .then(function(user){
      if (bcrypt.compareSync(req.body.password, user.dataValues.password_digest)) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.redirect('/sessions/login');
      }
    })
    .catch(function(error) {
      res.redirect('/users/signup');
    });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
});

router.get('/:id/requests/index', function(req, res, next) {
  models.Sport.findAll({}).then(function(sports) {
    models.Event.findAll({}).then(function(events) {
      models.Request.findAll({where: {UserId: req.session.user.id}}).then(function(myRequests) {
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
                }}).then(function(receivedRequests) {
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
})

router.post("/:user_id/requests/:id/complete", function(req, res, next) {
  var requestId = req.params.id;
  var userId = req.params.user_id;
  if (req.body.action === "Accepted") {
    models.Status.find({where: {name: req.body.action}}).then(function(status) {
      models.Request.find({where: {id: requestId}}).then(function(acceptedRequest) {
        if(acceptedRequest) {
          acceptedRequest.updateAttributes({
            StatusId: status.id
          }).then(function(){
            models.Event.find({where: {id: acceptedRequest.EventId}}).then(function(eventItem) {
              eventItem.updateAttributes({
                // Event should store the id of the accepted request. First the RequestId should be created
              }).then(function(){
                models.Status.find({where: {name: "Open"}}).then(function(openStatus) {
                  models.Request.findAll({
                    where: {
                      StatusId: openStatus.id,
                      EventId: eventItem.id
                    }
                  }).then(function(requests) {
                    console.log(requests)
                    res.redirect("/sessions/" + userId + "/requests/index");
                  })
                })
              })
            })
          })
        }
      })
    })
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
