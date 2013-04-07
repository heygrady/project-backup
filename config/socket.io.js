var RedisStore = require('socket.io/lib/stores/redis')
  , redis  = require('socket.io/node_modules/redis')
  , pub    = redis.createClient()
  , sub    = redis.createClient()
  , client = redis.createClient()
  , passportSocketIo = require("passport.socketio")

module.exports = function (io, config, passport) {
  // Passport authentication
  io.set('authorization', passportSocketIo.authorize({
      key: config.session.key        // the cookie where express (or connect) stores its session id.
    , secret: config.session.secret  // the session secret to parse the cookie
    , store: config.session.store    // the session store that express uses
    , fail: function(data, accept) { // *optional* callbacks on success or fail
        accept(null, false);         // second param takes boolean on whether or not to allow handshake
      }
    , success: function(data, accept) {
        accept(null, true);
      }
  }));

  // Redis store
  io.set('store', new RedisStore({
    redisPub : pub
  , redisSub : sub
  , redisClient : client
  }))

  // Socket.io config
  io.set('browser client minification', true)
  io.set('browser client etag', true)
  io.set('browser client gzip', true)
  io.set('match origin protocol', true)

}