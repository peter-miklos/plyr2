var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('events page content', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  before(function(done) {
    browser.visit('/', done);
  });

  before(function(done) {
    browser.pressButton('Create Event', done);
  });

  it('should allow you to create new events', function() {
    browser.assert.url({pathname: '/events/new'});
  });

  describe('create a new event', function() {

    before(function(done){
      browser.visit('/events/new', done);
    });

    before(function(done) {
      browser.select('sport', "wrestling", done);
      browser.check('master', done);
      browser.fill('event_date', 2016-10-27, done);
      browser.select('time', "15:00", done);
      browser.fill('comment', "I dare you!", done);
      browser.pressButton('Create Event!', done);
    });
    it("should redirect to homepage", function() {
      browser.assert.url({pathname: '/'});
    });
    it("should display wrestling on the page", function() {
       browser.assert.text("body", /wrestling/);
    });
  });

  after(function(done) {
    server.close(done);
  });

});
