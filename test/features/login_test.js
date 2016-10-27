process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true})
  });

  before(function() {
    models.User.create({
      name: "Test User",
      email: "test1@test.com",
      password: "$2a$10$eZNtx.H4tr28cCQDRofbVuePFNnpxUwMcAt0HLQhB5rBzONL0wVne"
    })
  })

  describe("user login page available", function() {
    before(function(done) {
      browser.visit('/', done);
    });

    before(function(done) {
      browser.clickLink('Log in', done);
    });

    it('should allow you to log in', function() {
      browser.assert.url({pathname: '/sessions/login'});
    });
  })

  describe('user logs in', function() {
    before(function(done) {
      browser.visit('/sessions/login', done);
    });

    before(function(done) {
      browser
        .fill('email', 'test1@test.com')
        .fill('password', 'Password')
        .clickLink('Log in', done)
    });

    it("should redirect to homepage if sign up is successful", function(){
      browser.assert.url({pathname: '/'});
    });

    it("should show the user's name in the navbar", function(){
      browser.assert.text("nav", /Test User/);
    });
  });

  after(function(done) {
    server.close(done);
  });

});
