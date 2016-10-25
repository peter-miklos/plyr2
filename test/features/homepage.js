var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('homepage content', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  before(function(done) {
    browser.visit('/', done);
  });

  it('should have content Welcome', function() {
    browser.assert.text("body", /Welcome/);
  });

  after(function(done) {
    server.close(done);
  });

});
