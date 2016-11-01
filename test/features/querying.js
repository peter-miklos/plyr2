process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models");

describe('Search for wrestling events', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true});
  });

  before(function(done){
    browser.visit('/users/new', done);
  });

  before(function(done) {
    browser
      .fill('name', 'Test User 1')
      .fill('email', 'test1@test.com')
      .fill('password', 'Password')
      .fill('password_confirmation', 'Password')
      .pressButton('Create Account', done);
  });

  before(function(done){
    browser.visit('/addsportsstatuses', done);
  });

  before(function(done){
    browser.visit('/events/new').then(function() {
      browser
       .select("#sport_select", "Tennis")
       .select("#skill", "4")
       .fill('date', '2016-11-30')
       .fill('time', "15:00")
       .fill('location', "Hyde Park")
       .fill('description', "I dare you!")
       .pressButton('Create Event', done);
    })
  });

  before(function(done){
    browser.visit('/events/new').then(function() {
      browser
       .select("#sport_select", "Wrestling")
       .select("#skill", "4")
       .fill('date', '2016-12-30')
       .fill('time', "15:00")
       .fill('location', "Peter's house")
       .fill('description', "I dare you!")
       .pressButton('Create Event', done);
    })
  });
  before(function(done){
    browser.visit('/events/search').then(function() {
      browser
       .select("#sport_select", "Wrestling")
       .pressButton('Search', done);
    })
  });

  it("should display wrestling on the page", function() {
     browser.assert.text("body", /Peter's house/);
     browser.assert.text("body", /Dec 30 2016/);
  });

after(function(done) {
  server.close(done);
});
});
