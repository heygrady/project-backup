
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Backup'
      },
      session: {
          key: 'app.session'
        , secret: 'ae894e2b653480e3311c7783399e6032'
        , store: null
        , cookie: null
      },
      db: 'mongodb://localhost/backup_dev',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
          clientID: "CONSUMER_KEY"
        , clientSecret: "CONSUMER_SECRET"
        , callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID'
        , clientSecret: 'APP_SECRET'
        , callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/google/callback"
      }
    }
  , test: {

    }
  , production: {

    }
}
