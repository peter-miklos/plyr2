var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('events page content', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  before(function(done) {
    browser.visit('/');
    browser.pressButton('Create Event', done);
  });

  it('should be succefull', function() {
    browser.assert.success();
  });

  describe('create a new event', function() {

    before(function(done) {
      browser.visit('/events');
      browser
      .select('sport', "wresling")
      .check('master')
      .fill('filter_date', 2016-10-27);
    });
  });



  after(function(done) {
    server.close(done);
  });

});
