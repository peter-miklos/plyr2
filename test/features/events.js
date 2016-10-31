process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('Manage events', function() {

 before(function(){
   server = http.createServer(app).listen(3000);
   browser = new Browser({ site: 'http://localhost:3000'});
   models.sequelize.sync({force:true});
 });

 before(function(done) {
   browser.visit('/users/new', done);
});

 before(function(done) {
   browser.fill('name', 'Ewan', done);
   browser.fill('email', 'ewan@hotmail.com', done);
   browser.fill('password', 'Password', done);
   browser.fill('password_confirmation', 'Password', done);
   browser.pressButton('Create Account', done);
 });

 before(function(done){
   browser.visit('/addsportsstatuses', done);
 });

 describe("Informs user if there is no events found", function() {
   before(function(done){
     browser.visit('/events/index', done);
   });

   it("Message is shown on the page", function() {
      browser.assert.text("body", /No events found/);
   });
 })

 describe("Creates new event", function() {
   before(function(done){
     browser.visit('/events/new').then(function() {
       browser
        .select("#sport_select", "Wrestling")
        .select("#skill", "4")
        .fill('date', '2016-11-30')
        .fill('time', "16:00")
        .fill('location', "Peter's house")
        .fill('description', "I dare you!")
        .pressButton('Create Event!', done)
     });
   });

   it("should redirect to homepage", function() {
     browser.assert.url({pathname: '/events/index'});
   });

   it("should display wrestling on the page", function() {
      browser.assert.text("body", /Peter's house/);
      browser.assert.text("body", /Nov 30 2016/);
   });
 });

 describe("Shows events in a list", function() {
   before(function(done){
     browser.visit('/events/new').then(function() {
       browser
        .select("#sport_select", "Wrestling")
        .select("#skill", "4")
        .fill('date', '2016-11-30')
        .fill('time', "15:00")
        .fill('location', "Hyde Park")
        .fill('description', "I dare you!")
        .pressButton('Create Event!', done);
     })
   });

   it("Message is shown on the page", function() {
      browser.assert.text("body", /Hyde Park/);
   });
 })

describe('Event date can not be earlier than today', function(){
  before(function(done){
    browser.visit('/events/new').then(function() {
      browser
       .select("#sport_select", "Wrestling")
       .select("#skill", "4")
       .fill('date', '2016-10-30')
       .fill('time', "15:00")
       .fill('location', "Hyde Park")
       .fill('description', "I dare you!")
       .pressButton('Create Event!', done);
    })
  });

  it("should show an error message", function(){
    browser.assert.text("body", /Event time can't be earlier than now/);
  });
})
//  describe("Shows the content of an event", function() {
//    before(function(done){
//      browser.visit('/events/new')
//    });
//
//    before(function(done){
//
//         browser.select("#sport_select", "Wrestling", done)
//         browser.select("#skill", "4", done)
//         browser.fill('date', '2016-11-30', done)
//         browser.fill('time', "15:00", done)
//         browser.fill('location', "Hyde Park", done)
//         browser.fill('description', "I double dare you!", done)
//         browser.pressButton('Create Event!', done).then(function() {
//           browser.clickLink("Wed Nov 30 2016");
//         });
//      })
//
//
//    //
//   //  it("STUFF is shown on the page", function() {
//   //     browser.assert.url({pathname: '/events/index'});
//   //  });
//
//
//   //  it("Shows the content of the event", function() {
//    //
//   //     browser.assert.text("body", /I double dare you!/);
//   //  });
// });

 after(function(done) {
   server.close(done);
 });

});
