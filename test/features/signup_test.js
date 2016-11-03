// process.env.NODE_ENV="test";
//
// var app = require('../../app');
// var Browser = require('zombie');
// var http = require('http');
// var models = require("../../models");
//
// describe('user sign up', function() {
//
//   before(function(){
//     server = http.createServer(app).listen(3000);
//     browser = new Browser({ site: 'http://localhost:3000'});
//   });
//
//     before(function(done) {
//       models.sequelize.sync({force:true});
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'Ewan', done);
//       browser.fill('email', 'ewan@hotmail.com', done);
//       browser.fill('password', 'Password', done);
//       browser.fill('password_confirmation', 'Password', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it("should redirect to homepage if sign up is successful", function(){
//       browser.assert.url({pathname: '/'});
//     });
//
//     it("should show the user's name in the navbar", function(){
//       browser.assert.text("nav", /Ewan/);
//     });
//
//     describe('incorrect sign up - no email', function() {
//
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'ewan', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it('should not sign in without email', function() {
//       browser.assert.url({pathname: '/users/new'});
//     });
//
//     it("should show an error message", function(){
//       browser.assert.text("body", /You need to enter a name, email and matching passwords/);
//     });
//
//   });
//
//   describe('incorrect sign up - email format', function() {
//
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'ewan', done);
//       browser.fill('email', 'ewan', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it('should not sign in without correctly formatted email', function() {
//       browser.assert.url({pathname: '/users/new'});
//     });
//
//   });
//
//   describe('mails for the users must be unique', function() {
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'ewan', done);
//       browser.fill('email', 'ewan@alfie.com', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan', done);
//       browser.pressButton('Create Account', done);
//     });
//     before(function(done) {
//         browser.clickLink('Log out', done);
//     });
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'ewan', done);
//       browser.fill('email', 'ewan@alfie.com', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it("should show an error message", function(){
//       browser.assert.text("body", /This mail was used previously/);
//     });
//   });
//
//   describe('incorrect sign up - no name', function() {
//
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('email', 'ewan@ewan.ewan', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it('should not sign in without name', function() {
//       browser.assert.url({pathname: '/users/new'});
//     });
//
//     it("should show an error message", function(){
//       browser.assert.text("body", /You need to enter a name, email and matching passwords/);
//     });
//   });
//
//   describe('incorrect sign up - not matching password', function() {
//
//     before(function(done) {
//       browser.visit('/users/new', done);
//     });
//
//     before(function(done) {
//       browser.fill('name', 'ewan', done);
//       browser.fill('email', 'ewan@ewan.ewan', done);
//       browser.fill('password', 'ewan', done);
//       browser.fill('password_confirmation', 'ewan2', done);
//       browser.pressButton('Create Account', done);
//     });
//
//     it('should not sign up with unmatching passwords', function() {
//       browser.assert.url({pathname: '/users/new'});
//     });
//
//     it("should show an error message", function(){
//       browser.assert.text("body", /You need to enter a name, email and matching passwords/);
//     });
//   });
//
//   after(function(done) {
//     server.close(done);
//   });
//
// });
