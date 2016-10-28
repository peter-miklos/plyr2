var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// must be deleted after MVP
router.get("/addsportsstatuses", function(req, res, next) {
  models.Sport.findOrCreate({where: {name: "Tennis"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Wrestling"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Ping Pong"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Open"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Accepted"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Rejected"}}).then(function() {});
  res.redirect('/');
})

module.exports = router;
