process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('Manage requests', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true});
  });

  before(function(done){
    browser.visit('/users/signup', done);
  });

  before(function(done) {
    browser
      .fill('name', 'Test User 1')
      .fill('email', 'test1@test.com')
      .fill('password', 'Password')
      .fill('password_confirmation', 'Password')
      .pressButton('Create Account', done);
  });

  before(function(done){
    browser.visit('/addsportsstatuses', done);
  });

  before(function(done){
    browser.visit('/events/new').then(function() {
      browser
       .select("#skill", "4")
       .fill('date', '2016-11-30')
       .fill('time', "15:00")
       .fill('location', "Hyde Park")
       .fill('description', "I dare you!")
       .pressButton('Create Event!', done);
    })
  });

  describe("Show requests", function() {

    describe("Informs user if there is no received request found", function() {
      before(function(done){
        browser.visit('/').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
        browser.assert.text("div", /No received requests found/);
      });
    })

    describe("Informs user if there is no sent request found", function() {
      before(function(done){
        browser.visit('/').then(function() {
          browser.clickLink("My requests", done);
        })
      });

      it("Message is shown on the page", function() {
         browser.assert.text("div", /No sent requests found/);
      });
    });

    describe("My requests is not available w/o log in", function() {

      it("User doesn't see the my requests", function() {
        browser.clickLink("Log out").then(function() {
          browser.assert.hasNoClass("li", "my_requests");
        })
      })
    })
  });

  describe("Add request", function() {

    describe("request cannot be added w/o log in", function() {
      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      it("User cannot create a request if not logged in", function() {
        browser.assert.hasNoClass("div", "join_button");
      })
    });

    describe("an event and a connected request cannot have the same owner", function() {
      before(function(done){
        browser.visit('/').then(function() {
          browser.clickLink("Log in", done);
        })
      });

      before(function(done) {
        browser
          .fill('email', 'test1@test.com')
          .fill('password', 'Password')
          .pressButton('Log in', done);
      });

      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      it("Join button not visible at logged in user's event", function() {
        browser.assert.hasNoClass("div", "join_button");
      })
    });

    describe("User is able to join an event", function() {

      before(function(done){
        browser.visit("/").then(function() {
          browser.clickLink("Log out");
        }).then(function() {
          browser.visit('/users/signup', done);
        })
      });

      before(function(done) {
        browser
          .fill('name', 'Test User2')
          .fill('email', 'test2@test.com')
          .fill('password', 'Password')
          .fill('password_confirmation', 'Password')
          .pressButton('Create Account', done);
      });

      before(function(done){
        browser.visit('/events/new').then(function() {
          browser
           .select("#skill", "2")
           .fill('date', '2016-12-15')
           .fill('time', "11:00")
           .fill('location', "Makers")
           .fill('description', "come and play")
           .pressButton('Create Event!', done);
        })
      });

      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      it("Join button visible at another user's event", function() {
        browser.assert.elements("button", { atLeast: 1 });
      })

    });

    describe("User can create a request to an event", function() {

      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      before(function(done) {
        browser.pressButton("JOIN", done);
      })

      it("request's empty comment field is available", function() {
        browser.assert.elements("textarea", { atLeast: 1 });
      })

      it("created request is available in user's sent requests", function(done) {
        browser.fill("comment", "I really wanna play", done);
        browser.pressButton("Send request!").then(function() {
          browser.assert.text("div", /I really wanna play/);
        }).then(function() { done(); })
      })
    });

    describe("user cannot create a request to the same event more than once", function() {
      before(function(done){
        browser.visit('/events/index').then(function() {
          browser.clickLink("Wed Nov 30 2016", done);
        })
      });

      it("doesn't show the Join button", function() {
        browser.assert.hasNoClass("div", "join_button");
      })

      it("informs user that he/she already joined the event", function() {
        browser.assert.text("body", /Request has been sent/)
      })


    })
  });

  describe("Reject request", function() {

    before(function(done){
      browser.clickLink("Log out").then(function() {
        browser.clickLink("Log in", done);
      });
    });

    before(function(done) {
      browser
        .fill('email', 'test1@test.com')
        .fill('password', 'Password')
        .pressButton('Log in').then(function() {
          browser.clickLink("My requests", done);
        })
    });

    it("received requests list shows the received request", function() {
      browser.assert.text("div", /I really wanna play/);
      browser.assert.hasNoClass("div", "no_received_request");
    })

    it("request becomes Rejeted", function(done) {
      browser.pressButton("Reject").then(function() {
        browser.assert.text("td", /Rejected/)
      }).then(function() { done(); });
    })
  });

  describe("Accept request", function() {

    before(function(done) {
      browser.visit('/events/index').then(function() {
        browser.clickLink("Thu Dec 15 2016").then(function() {
          browser.pressButton("Join", done);
        })
      })
    });

    before(function(done) {
      browser.fill("comment", "wanna play with you 1", done);
      done()
    })

    before(function(done) {
      browser.pressButton("Send request!", done)
    })

    before(function(done){
      browser.clickLink("Log out").then(function() {
        browser.clickLink('Sign up', done);
      })
    });

    before(function(done) {
      browser
        .fill('name', 'Test User 3')
        .fill('email', 'test3@test.com')
        .fill('password', 'Password')
        .fill('password_confirmation', 'Password')
        .pressButton('Create Account', done);
    });

    before(function(done) {
      browser.visit('/events/index').then(function() {
        browser.clickLink("Thu Dec 15 2016").then(function() {
          browser.pressButton("Join", done);
        })
      })
    });

    before(function(done) {
      browser.fill("comment", "wanna play with you 2", done);
      done()
    })

    before(function(done) {
      browser.pressButton("Send request!", done)
    })

    before(function(done) {
      browser.clickLink("Log out").then(function() {
        browser.clickLink('Log in', done);
      })
    });

    before(function(done){
      browser
        .fill('email', 'test2@test.com')
        .fill('password', 'Password')
        .pressButton('Log in').then(function() {
          browser.clickLink("My requests", done);
        })
    });

    before(function(done) {
      browser.pressButton("Confirm").then(function() {
        browser.clickLink("My requests", done);
      })
    })

    it("first request's status becomes Accepted", function() {
      browser.assert.text("tbody", /wanna play with you 1 Test User 1 Accepted/)
    })

    it("second request's status becomes Rejected", function() {
      browser.assert.text("body", /wanna play with you 2 Test User 3 Rejected/)
    })

  });

  after(function(done) {
    server.close(done);
  });

});
