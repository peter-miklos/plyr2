process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true});
  });

  describe("Manage requests", function() {

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

    describe("Informs user if there is no received request found", function() {
      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
         browser.assert.text("div", /No received requests found/);
      });
    })

    describe("Informs user if there is no sent request found", function() {
      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
         browser.assert.text("div", /No sent requests found/);
      });
    })


  })

  after(function(done) {
    server.close(done);
  });

});
