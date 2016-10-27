process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('Manage events', function() {

 before(function(){
   server = http.createServer(app).listen(3000);
   browser = new Browser({ site: 'http://localhost:3000'});
 });

 describe("Create new event", function() {
   before(function(done){
     browser.visit('/events/new', done);
   });

   before(function(done) {
     browser.select("#sport", "Wrestling", done);
     browser.select("#skill", "4", done);
     browser.fill('date', '2016-10-30', done);
     browser.fill('time', "15:00", done);
     browser.fill('location', "Peter's house", done);
     browser.fill('comment', "I dare you!", done);
     browser.pressButton('Create Event!', done);
   });

   it("should redirect to homepage", function() {
     browser.assert.url({pathname: '/events/index'});
   });

   it("should display wrestling on the page", function() {
      browser.assert.text("body", /Peter's house/);
      browser.assert.text("body", /Oct 30 2016/);
   });
 });

 describe("Inform user if there is no events found", function() {
   before(function(done){
     browser.visit('/events/index', done);
   });

   it("Message is shown on the page", function() {
      browser.assert.text("body", /No events found/);
   });
 })

 after(function(done) {
   server.close(done);
 });

});
