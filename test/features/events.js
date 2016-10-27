process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

describe('events page content', function() {

 before(function(){
   server = http.createServer(app).listen(3000);
   browser = new Browser({ site: 'http://localhost:3000'});
 });

   before(function(done){
     browser.visit('/events/new', done);
   });

   before(function(done) {
     browser.select("#sport", "Wrestling", done);
     browser.select("#skill", "4", done);
     browser.fill('event_date', 27-10-2016, done);
     browser.fill('time', "15:00", done);
     browser.fill('location', "Peter's house", done);
     browser.fill('comment', "I dare you!", done);
     browser.pressButton('Create Event!', done);
   });

   it("should redirect to homepage", function() {
     browser.assert.url({pathname: '/events/index'});
   });

   it("should display wrestling on the page", function() {
      browser.assert.text("body", /Wrestling/);
      browser.assert.text("body", /27-10-2016/);
   });

 after(function(done) {
   server.close(done);
 });

});
