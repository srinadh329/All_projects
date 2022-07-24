var config = require('./environment');
let sockets = new Set();
let users = new Set();
var user
// When the user disconnects.. perform this
function onDisconnect(socket) {
  console.log("Disconnection process$$$$$$$")

}

// When the user connects.. perform this
function onConnect(socket) {
  sockets.add(socket);
  // When the client emits 'info', this listens and executes
  
  socket.on('info', function (data) {
    user = { "sockid": socket.id, "userid": data }
    users.add(user);
  });

  socket.on('send-notification', function (data) {
    socket.broadcast.emit('notification', data);
  })

  socket.on('verify-mail', function (data) {
    console.log(data)

    socket.broadcast.emit('verifyemail', data);
  })


  socket.on('send-message', function (data) {
    console.log(data)
    socket.broadcast.emit('message', data);
  })
  socket.on('send-recentactivity', function (data) {
    socket.broadcast.emit('recentactivity', data);
  })

  socket.on('logout', function (data) {
    for (user of users) {
      if (user.userid == data) {
          users.delete(user);
          //socket.disconnect();
      }
  }
   
  });
 
    
  // Insert sockets below
  
  // require('../api/thing/thing.socket').register(socket);
 
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();
    // Call onDisconnect.
    socket.on('disconnect', function () {
    
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });
    

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
