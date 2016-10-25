var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('user homescreen', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  before(function(done) {
    browser.visit('/users', done);
  });

  it('should have content sign up', function() {
    browser.assert.text("body", /Log in/);
  });

  after(function(done) {
    server.close(done);
  });

});
