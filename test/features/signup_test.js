

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('homescreen', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });


  before(function(done) {
    browser.visit('/', done);
  });

  before(function(done) {
    browser.pressButton('Sign up', done);
  });

  it('should allow you to sign up', function() {
    browser.assert.url({pathname: '/users/signup'});
  });

  describe('user sign up', function() {

    before(function(done) {
      browser.visit('/users/signup', done);
    });

    before(function(done) {
      browser.fill('name', 'Ewan', done);
      browser.fill('email', 'ewan@hotmail.com', done);
      browser.fill('password', 'Password', done);
      browser.fill('password_confirmation', 'Password', done);
      browser.pressButton('Create account', done)
    });

    it("should redirect to homepage if sign up is successful", function(){
      browser.assert.url({pathname: '/'});
    });

    // it("should display a log out button", function(){
    //   browser.assert.text("head", /Log out/);
    // });

  });

  after(function(done) {
    server.close(done);
  });

});
