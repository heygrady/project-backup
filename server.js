/* Main application entry file. Please note, the order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express')
  , h5bp = require('h5bp')
  , fs = require('fs')
  , passport = require('passport')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
db = mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()
//app.use(h5bp({ root: config.root + '/public' }))

// express settings
require('./config/express')(app, config, passport, db)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

require('./config/socket.io')(io, config, passport)

server.listen(port)

// socket.io
require('./config/socket.io.routes')(io, auth);

console.log('Express app started on port '+port)
