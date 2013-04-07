
var async = require('async')
  , passportSocketIo = require("passport.socketio")

module.exports = function (io, auth) {
  

  //filter sockets by user...
  // var userGender = socket.handshake.user.gender 
  //   , opposite = userGender === "male" ? "female" : "male";
  // alert users when the opposite sex has arrived
  // passportSocketIo.filterSocketsByUser(io, function (user) {
  //   return user.gender === opposite;
  // }).forEach(function(s){
  //   s.send("a " + userGender + " has arrived!");
  // });


  

  // default
  io.sockets.on('connection', function (socket) {
    socket.on('some event', function (data) {
      console.log(data);
    });
  })

  // users
  var users = io.of('/users').on('connection', function(socket) {
    // Users controller
    // var controller = require('../app/controllers/users')
    
    // attach a controller to an event
    //socket.on('event name', controller.login)

    socket.emit('a message', {
        that: 'only this user in /users will get'
    });

    users.emit('a message', {
        that: 'everyone in /users will get'
    });
    
    //socket.volatile.emit('bieber tweet', tweet);
  })
}
