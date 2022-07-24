var socketio=require('../app').socket
let sockets = new Set();
let users = new Set();
var user
verbose = false ;
session_directory = "/tmp" ;
// When the user disconnects.. perform this
function onDisconnect(socket) {

}

// When the user connects.. perform this
function onConnect(socket) {
  sockets.add(socket);
  // When the client emits 'info', this listens and executes
  
  socket.on('info', function (data) {
    user = { "sockid": socket.id, "userid": data }
    users.add(user);
  });

  socket.on('logout', function (data) {
    for (user of users) {
      if (user.userid == data) {
          users.delete(user);
      }
  }
   
  });
}
// exports=module.exports = function (socketio) {
socket_id_to_session_id = [] ;
session_id=''

 socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;
    socket.connectedAt = new Date();
    socket.on('session_id',function(session_data){
        roomie= session_data["id"]
      socket_id_to_session_id[socket.id] = session_data["id"] ;
      uid=session_data["uid"]
       socketiniting(socket,session_data)

 })

  socket.on('disconnect', function () {
      socket.leave(socket_id_to_session_id[socket.id])
   console.log(socket.id + " disconnected" ) ;

  });

  
    socket.on('connect', function () {
         onConnect(socket);  
         roommeesage(socket)     
    }); 
  });

 

// };
// exports=module.exports=socketio