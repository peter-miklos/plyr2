var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('user homescreen', function() {

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



  after(function(done) {
    server.close(done);
  });

});
