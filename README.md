# PLYR2

Plyr2 is a mobile friendly web app that connects like-minded, sport enthusiasts.
Targeted at providing a solution to the problem of wanting to play tennis, ping
pong or indeed any sport you desire, but being unable to find a partner,
plyr2 is an elegant, scalable answer to a common summer problem.

Plyr2 is a social media platform that enables users to both invite others to play with them and view other's requests on an interactive map. After picking their preferred sport, a user decides the date, time, location and skill level of their event, as well as space for any additional comments.

This is displayed with a nice, little logo on a google API-rendered map. Other users can then view these prospective events, and decide if they want to participate. Working under the assumption that people won't just use the site to see a picture of London with pretty logos, a request to play will be made by another user, who can include a personal message to the creator if they so choose. The person who created event then decides whether to accept or not. A log is kept of a user's past events so they are free to reminisce at their leisure.     


Technologies used are:

* Node JS / Express / Sequelize / Postgres
* Mocha / Zombie
* Heroku

You can check it out [here](https://plyr2.herokuapp.com)

If you want to run it locally follow these instructions:

1. Fork / clone this repo: `git clone https://github.com/peter-miklos/plyr2`
2. Change into the directory `cd plyr2`
3. Run `npm install` (and `gem install node` if you don't already have rails)
4. Set up your databases by entering psql and creating two databases: `create database sports_test` and `create database sports_test`
5. Run a migration for both the development database `node_modules/.bin/sequelize db:migrate` and the test one `NODE_ENV=test node_modules/.bin/sequelize db:migrate`
6. Create a .env file and add your own google API key
7. Run the app! `DEBUG=* npm start`

Enjoy ...

Made with love by:

* [Alfie](https://github.com/alfie-ab)
* [Ben](https://github.com/BenRoss92)
* [Erce](https://github.com/ercekal)
* [Peter](https://github.com/peter-miklos)
* [Stephan](https://github.com/nephast)
* [Summer](https://github.com/supasuma)
