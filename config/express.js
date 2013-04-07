
/**
 * Module dependencies.
 */

var express = require('express')
  , h5bp = require('h5bp')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , helpers = require('view-helpers')

function dbSettings(db, config) {
  return {
      db: db.connections[0].db.databaseName
    , host: db.connections[0].db.serverConfig.host
    , port: db.connections[0].db.serverConfig.port
    , username: db.connections[0].user
    , password: db.connections[0].pass
    , collection: config.session.collection
  };
}

module.exports = function (app, config, passport, db) {
  app.enable('trust proxy')

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(express.compress())
  app.use(express.static(config.root + '/public'))
  app.use(express.logger('dev'))

  // set views path, template engine and default layout
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

  app.configure(function () {
    // dynamic helpers
    app.use(helpers(config.app.name))

    // cookieParser should be above session
    config.session.cookie = express.cookieParser()
    app.use(config.session.cookie)

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // express/mongo session storage
    config.session.store = new mongoStore(dbSettings(db, config))

    app.use(express.session({
        key: config.session.key
      , secret: config.session.secret
      , store: config.session.store
    }))

    // connect flash for flash messages
    app.use(flash())

    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.favicon())

    // routes should be at the last
    app.use(app.router)

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack)

      // error page
      res.status(500).render('500', { error: err.stack })
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
    })

  })
}
