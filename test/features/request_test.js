process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('Manage requests', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true});
  });

  before(function(done){
    browser.visit('/users/signup', done);
  });

  before(function(done) {
    browser
      .fill('name', 'Ewan')
      .fill('email', 'ewan@hotmail.com')
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
       .select("#skill", "4")
       .fill('date', '2016-11-30')
       .fill('time', "15:00")
       .fill('location', "Hyde Park")
       .fill('description', "I dare you!")
       .pressButton('Create Event!', done);
    })
  });

  describe("Show requests", function() {

    describe("Informs user if there is no received request found", function() {
      before(function(done){
        browser.visit('/').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
        browser.assert.text("div", /No received requests found/);
      });
    })

    describe("Informs user if there is no sent request found", function() {
      before(function(done){
        browser.visit('/').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
         browser.assert.text("div", /No sent requests found/);
      });
    });

    describe("My requests is not available w/o log in", function() {

      it("User doesn't see the my requests", function() {
        browser.clickLink("Log out").then(function() {
          browser.assert.hasNoClass("li", "test");
        })
      })
    })
  });

  describe("Add request", function() {

    describe("request cannot be added w/o log in", function() {
      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      it("User cannot create a request if not logged in", function() {

      })


    });

    describe("User cannot create a request to his/her event", function() {

    });

    describe("User can create a request to an event", function() {

    })

  });

  after(function(done) {
    server.close(done);
  });

});
