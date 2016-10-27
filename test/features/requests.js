
var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  

  after(function(done) {
    server.close(done);
  });

});
