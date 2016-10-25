var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

xdescribe('events page content', function() {

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
  after(function(done) {
    server.close(done);
  });

  describe('create a new event', function() {

    before(function(){
      server = http.createServer(app).listen(3000);
      browser = new Browser({ site: 'http://localhost:3000'});
    });

    before(function(done) {
      browser.visit('/events').then(function(){
      browser
      .select('sport', "wresling")
      .check('master')
      .fill('event_date', 2016-10-27)
      .select('time', "15:00")
      .fill('comment', "I dare you!")
      .pressButton('Create Event!', done);
      });
    });
  });

  after(function(done) {
    server.close(done);
  });

});
