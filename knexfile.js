// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'sports_development'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'sports_test',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  },

};
