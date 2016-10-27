process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('user sign up', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

    before(function(done) {
      models.sequelize.sync({force:true})
      browser.visit('/users/signup', done);
    });

    before(function(done) {
      browser.fill('name', 'Ewan', done);
      browser.fill('email', 'ewan@hotmail.com', done);
      browser.fill('password', 'Password', done);
      browser.fill('pwd_confirm', 'Password', done);
      browser.pressButton('Create Account', done)
    });

    it("should redirect to homepage if sign up is successful", function(){
      browser.assert.url({pathname: '/'});
    });

  after(function(done) {
    server.close(done);
  });

});
