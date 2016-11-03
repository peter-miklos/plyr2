// process.env.NODE_ENV="test";
//
// var app = require('../../app');
// var Browser = require('zombie');
// var http = require('http');
// var models = require("../../models");
//
// describe('log in', function() {
//
//   before(function(){
//     server = http.createServer(app).listen(3000);
//     browser = new Browser({ site: 'http://localhost:3000'});
//     models.sequelize.sync({force:true});
//   });
//
//   before(function(done) {
//     browser.visit('/users/new', done);
//  });
//
//   before(function(done) {
//     browser.fill('name', 'Ewan', done);
//     browser.fill('email', 'ewan@hotmail.com', done);
//     browser.fill('password', 'Password', done);
//     browser.fill('password_confirmation', 'Password', done);
//     browser.pressButton('Create Account', done);
//   });
//
//   before(function(done){
//     browser.visit('/addsportsstatuses', done);
//   });
//
//
//     before(function(done) {
//       browser.visit('/sessions/login', done);
//     });
//
//     before(function(done) {
//         browser.fill('email', 'ewan@hotmail.com', done);
//         browser.fill('password', 'Password', done);
//         browser.pressButton('Log in', done);
//     });
//
//     it("should redirect to homepage if login is successful", function(){
//       browser.assert.url({pathname: '/'});
//     });
//
//     it("should show the user's name in the navbar", function(){
//       browser.assert.text("nav", /Ewan/);
//     });
//
//     describe('incorrect log in - no email or none existing email in DB', function() {
//
//     before(function(done) {
//       browser.visit('/sessions/login', done);
//     });
//
//     before(function(done) {
//       browser.fill('password', 'Password', done);
//       browser.pressButton('Log in', done);
//     });
//
//     it('should not log in without email', function() {
//       browser.assert.url({pathname: '/sessions/login'});
//     });
//
//     it("should show an error message", function(){
//       browser.assert.text("body", /Incorrect email or password/);
//     });
//
//   });
//
//   describe('incorrect log in - no password or none existing password', function() {
//
//   before(function(done) {
//     browser.visit('/sessions/login', done);
//   });
//
//   before(function(done) {
//     browser.fill('email', 'ewan@hotmail.com', done);
//     browser.pressButton('Log in', done);
//   });
//
//   it('should not log in without password', function() {
//     browser.assert.url({pathname: '/sessions/login'});
//   });
//
//   it("should show an error message", function(){
//     browser.assert.text("body", /Incorrect email or password/);
//   });
//
// });
//
//   after(function(done) {
//     server.close(done);
//   });
//
// });
