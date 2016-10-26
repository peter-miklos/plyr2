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
     browser.select("#sport", "wrestling", done);
     browser.check('#expert', done);
     browser.fill('event_date', 2016-10-27, done);
     browser.fill('time', "15:00", done);
     browser.fill('comment', "I dare you!", done);
     browser.pressButton('Create Event!', done);
   });

   it("should redirect to homepage", function() {
     browser.assert.url({pathname: '/'});
   });

   it("should display wrestling on the page", function() {
      browser.assert.text("body", /Wrestling/);
   });

   describe('show all events', function() {

     before(function(done){
       browser.visit('/events/new');
        browser.select("#sport", "wrestling", done);
     });

     it("should display the various events on the page", function() {
        browser.assert.text("body", /Wrestling/);
     });
   });


   describe('show received and booked events', function() {

     before(function(done) {
       browser.visit('/events/requests', done);
     });

     it("should display the events of the user", function() {
       browser.assert.text("body", /Wrestling/);
     });
   });

   describe('accept events', function() {

     before(function(done) {
       browser.visit('/events/requests', done);
     });
     it("should let the user accept events", function() {
       browser.assert.text("body", /Wrestling/);
     });
   });

   describe('reject events', function() {

     before(function(done) {
       browser.visit('/events/requests', done);
     });
     it("should let the user reject events", function() {
       browser.assert.text("body", /Wrestling/);
     });
   });

   describe('cancel events (by owner and requestor)', function() {

     before(function(done) {
       browser.visit('/events/requests', done);
     });
     it("should let the user cancel events", function() {
       browser.assert.text("body", /Wrestling/);
     });
   });

 after(function(done) {
   server.close(done);
 });

});
