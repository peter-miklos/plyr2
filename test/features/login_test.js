

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });


  before(function(done) {
    models.sequelize.sync({force:true})
    browser.visit('/', done);
  });

  before(function(done) {
    browser.clickLink('Log in', done);
  });

  it('should allow you to log in', function() {
    browser.assert.url({pathname: '/users/login'});
  });

  describe('user log in', function() {

    before(function(done) {
      browser.visit('/users/login', done);
    });

    before(function(done) {
      browser.fill('email', 'ewan@hotmail.com', done);
      browser.fill('password', 'Password', done);
      browser.clickLink('Log in', done)
    });

    it("should redirect to homepage if sign up is successful", function(){
      browser.assert.url({pathname: '/'});
    });

  });


  after(function(done) {
    server.close(done);
  });

});
