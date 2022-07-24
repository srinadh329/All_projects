var config = require('./environment');
var socketio=require('../app').socket
var moment = require('moment');
let sockets = new Set();
let users = new Set();
var user
var roomlist =[];
var   examusersession={}
verbose = false ;
session_directory = "/tmp" ;
// When the user disconnects.. perform this
function onDisconnect(socket) {
  

}
var clients = {}

// When the user connects.. perform this
function onConnect(socket) {
  var roomie
  var rommcount=0
  sockets.add(socket);
}
module.exports = function (socketio) {
var roomparticipants=[]
var collaborations = [] ;
// var rooms={}
var roomlist=[]
socket_id_to_session_id = [] ;
session_id=''

 socketio.on('connection', function (socket) {
    
    var roomie=''
    var uid=''
    socket.setMaxListeners(20);
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
function socketiniting(socket,session_data){
    data={}
  if(session_data!='' && !(session_data["id"] in collaborations) ) {
      // not in memory but is is on the filesystem?
      if( file_exists(session_directory + "/" + session_data["id"]) ) {
          if( verbose ) { console.log( "   session terminated previously, pulling back from filesystem" ) ; }
          var data = read_file( session_directory + "/" + session_data["id"] ) ;
          if( data!==false ) {
              collaborations[session_data["id"]] = {'cached_instructions':JSON.parse(data), 'participants':{},
            
            } ;
          } else {
              // something went wrong, we start from scratch
              collaborations[session_data["id"]] = {'code_editor_cached_instructions':[], 'input_editor_cached_instructions':[],'participants':{}} ;
          }
      } else {
          if( verbose ) { console.log( "   creating new session" ) ; }
          collaborations[session_data["id"]] = {'code_editor_cached_instructions':[], 'input_editor_cached_instructions':[], 'participants':{}} ;
      }
  }
 
  collaborations[session_data["id"]]['participants'][session_data["uid"]]=socket.id
  if(collaborations[roomie]){
    var date =  new moment()
    var updated_hour = date
    var duration=moment.duration(updated_hour.diff( collaborations[roomie]["current_hour"]))
    collaborations[roomie]["timeleft"] = collaborations[roomie]["actualtime"]-duration.asMinutes()
    socket.emit("leftovertime",collaborations[roomie]["timeleft"])
  }
Object.values(collaborations[session_data["id"]]['participants']).forEach(i=>{
    socketio.to(i).emit("called",collaborations[session_data["id"]]['participants'])
})
//  socket.broadcast.to(Object.values(collaborations[session_data["id"]]['participants'])).emit("called",collaborations[session_data["id"]]['participants'])
}
socket.on('info', function (data) {
  //socket.join(data);
  clients[socket.id] = socket;
  user = { "sockid": socket.id, "userid": data }
  //socket.handshake.join("user",)
  //socket.join(useridsocket.handshake.user.id);
  users.add(user);
});

socket.on('send-notification', function (data) {
  console.log('notification', data);
  socket.broadcast.emit('notification', data);
})

socket.on('send-message', function (data) {
  console.log(data)
  socket.broadcast.emit('message', data);
})
socket.on('ticket', function (data) {
  socket.broadcast.emit('tickets', data);
})
socket.on('send-recentactivity', function (data) {
  socket.broadcast.emit('recentactivity', data);
})

socket.on('logout', function (data) {
  socket.leave(socket_id_to_session_id[socket.id]);
  socket.disconnect(true);
delete clients[socket.id];
  for (user of users) {
    if (user.userid == data) {
     // sockets.socket(users[data])
        users.delete(user);
    
    }
}
 
});
  socket.on('change', function( delta ) {
      if( verbose ) { console.log( "change " + socket_id_to_session_id[socket.id] + " " + delta ) ; }
      if( socket_id_to_session_id[socket.id] in collaborations ) {
          collaborations[socket_id_to_session_id[socket.id]]['code_editor_cached_instructions'].push( ["change", delta, Date.now()] ) ;
          Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
            if( socket.id!=i) {
                          socketio.to(i).emit( "change", delta ) ;
                      }
          })
       } else {
          if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
      }
  });
socket.on('change_selection', function( selections ) {
      if( verbose ) { console.log( "change_selection " + socket_id_to_session_id[socket.id] + " " + selections ) ; }
      if( socket_id_to_session_id[socket.id] in collaborations ) {
         
          Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
            if( socket.id!=i) {
                          socketio.to(i).emit( "change_selection", delta ) ;
                      }
          })
      } else {
          if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
      }
  });


  socket.on('clear_buffer', function() {
      if( verbose ) { console.log( "clear_buffer " + socket_id_to_session_id[socket.id] ) ; }
      if( socket_id_to_session_id[socket.id] in collaborations ) {
          collaborations[socket_id_to_session_id[socket.id]]['code_editor_cached_instructions'] = [] ;
          collaborations[socket_id_to_session_id[socket.id]]['code_editor_cached_instructions'].push( ["change", delta, Date.now()] ) ;
          Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
            if( socket.id!=i) {
                          socketio.to(i).emit( "clear_buffer" ) ;
                      }
          })
           
      } else {
          if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
      }
  });


  socket.on('dump_buffer', function() {
      if( verbose ) { console.log( "dump_buffer " + socket_id_to_session_id[socket.id] ) ; }
      if( socket_id_to_session_id[socket.id] in collaborations ) {
          for( var i=0 ; i<collaborations[socket_id_to_session_id[socket.id]]['code_editor_cached_instructions'].length ; i++ ) {
            
            socketio.to(socket.id).emit( "change", collaborations[socket_id_to_session_id[socket.id]]['code_editor_cached_instructions'][i][1] ) ;
          }
      } else {
          if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
      }
      socket.emit( "buffer_dumped" ) ;
  });
  socket.on('changen', function( delta ) {
    if( verbose ) { console.log( "change " + socket_id_to_session_id[socket.id] + " " + delta ) ; }
    if( socket_id_to_session_id[socket.id] in collaborations ) {
        collaborations[socket_id_to_session_id[socket.id]]['input_editor_cached_instructions'].push( ["change", delta, Date.now()] ) ;
        Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
            if( socket.id!=i) {
                          socketio.to(i).emit( "changen", delta ) ;
                      }
          })
    } else {
        if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
    }
});
socket.on('change_selectionn', function( selections ) {
    if( verbose ) { console.log( "change_selection " + socket_id_to_session_id[socket.id] + " " + selections ) ; }
    if( socket_id_to_session_id[socket.id] in collaborations ) {
       
          Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
            if( socket.id!=i) {
                          socketio.to(i).emit( "change_selection", delta ) ;
            }  })
    } else {
        if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
    }
});


socket.on('clear_buffern', function() {
    if( verbose ) { console.log( "clear_buffer " + socket_id_to_session_id[socket.id] ) ; }
    if( socket_id_to_session_id[socket.id] in collaborations ) {
        collaborations[socket_id_to_session_id[socket.id]]['input_editor_cached_instructions'] = [] ;
          Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
          if( socket.id!=i) {
            socketio.to(i).emit( "clear_buffern" ) ;
                    }})
    } else {
        if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
    }
});


socket.on('dump_buffern', function() {
    if( verbose ) { console.log( "dump_buffer " + socket_id_to_session_id[socket.id] ) ; }
    if( socket_id_to_session_id[socket.id] in collaborations ) {
        for( var i=0 ; i<collaborations[socket_id_to_session_id[socket.id]]['input_editor_cached_instructions'].length ; i++ ) {
          socketio.to(socket.id).emit("changen", collaborations[socket_id_to_session_id[socket.id]]['input_editor_cached_instructions'][i][1] ) ;
        }
    } else {
        if( verbose ) { console.log( "WARNING: could not tie socket_id to any collaboration" ) ; }
    }
    socket.emit( "buffer_dumpedn" ) ;
});
socket.on('actualtime',function(data){
  if(collaborations[roomie]){
    collaborations[roomie]["actualtime"]=data
    var date =  new moment()
    var current_hour = date
    collaborations[roomie]["current_hour"]=current_hour

   
  }

})
  // socket.on('disconnect', function () {
  //     socket.leave(socket_id_to_session_id[socket.id])
  //  var date =  new moment()
  //  var updated_hour = date
  //  if(collaborations[roomie]){
  //   var duration=moment.duration(updated_hour.diff( collaborations[roomie]["current_hour"]))
  //   collaborations[roomie]["timeleft"] =collaborations[roomie]["actualtime"]-duration.asMinutes()
  //   // collaborations[roomie]["participants"][uid]=''
  //   var temparr= collaborations[roomie]["participants"]
  //   delete temparr[uid]
  //   if(Object.values(collaborations[roomie]["participants"]).length>0){
  //     Object.values(collaborations[roomie]["participants"]).forEach(i=>{
  //       if(i!=''){
  //         socketio.to(i).emit("called",temparr)
  //       }
      
  //     })
  //   }else{
  //     delete collaborations[roomie]
  //     roomlist.splice( roomlist.indexOf(roomie), 1 );
  //   }

   
  // }
 

  // });

  socket.on('disconnect', function () {

 socket.leave(socket_id_to_session_id[socket.id])

 if( collaborations[socket_id_to_session_id[socket.id]] ) {
//      //var index = collaborations[socket_id_to_session_id[socket.id]].participants.indexOf( socket.id ) ;
   for(var key in collaborations[socket_id_to_session_id[socket.id]]['participants']){
if(collaborations[socket_id_to_session_id[socket.id]]['participants'][key]==socket.id)
delete collaborations[socket_id_to_session_id[socket.id]]['participants'][key]
}
if(Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).length>0){
  Object.values(collaborations[socket_id_to_session_id[socket.id]]["participants"]).forEach(i=>{
    socketio.sockets.in(socket_id_to_session_id[socket.id]).emit("called",collaborations[roomie]["participants"])
  })
    }else{
      delete collaborations[socket_id_to_session_id[socket.id]]
      roomlist.splice( roomlist.indexOf(socket_id_to_session_id[socket.id]), 1 );
    }
}
if(examusersession[uid.toString()]){
  var data=JSON.parse(JSON.stringify(examusersession[uid]))
  var date =  new moment()
  var updated_hour = date
  data["endtime"]=updated_hour
  var duration=moment.duration(updated_hour.diff( data["actualtime"]))
  if(duration<0){
    data["timeleft"] =0
  }else{
    data["timeleft"] =data["time"]-duration.asMinutes()
  }
  examusersession[uid]=data
  
}


});
socket.on("employeewent",function(data){
  Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
    socketio.to(i).emit("employewent",'')
})
})
socket.on('session',function(data)
{

delete examusersession[data]

  

})
socket.on("end",function(data){
          if( collaborations[socket_id_to_session_id[socket.id]] ) {
        //      //var index = collaborations[socket_id_to_session_id[socket.id]].participants.indexOf( socket.id ) ;
           for(var key in collaborations[socket_id_to_session_id[socket.id]]['participants']){
        if(collaborations[socket_id_to_session_id[socket.id]]['participants'][key]==socket.id)
        delete collaborations[socket_id_to_session_id[socket.id]]['participants'][key]

        }
        if(Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).length>0){
          Object.values(collaborations[socket_id_to_session_id[socket.id]]["participants"]).forEach(i=>{
            socketio.sockets.in(socket_id_to_session_id[socket.id]).emit("called",collaborations[roomie]["participants"])
          })
            }else{
              delete collaborations[socket_id_to_session_id[socket.id]]
              roomlist.splice( roomlist.indexOf(socket_id_to_session_id[socket.id]), 1 );
            }
        }
     
})
   socket.on('base64 file', function (msg) {
    socket.username = msg.username;
    // socket.broadcast.emit('base64 image', //exclude sender
    socket.broadcast.to(roomie).emit('base64 file',  //include sender

        {
          type:"file",
          username: socket.username,
          file: msg.file,
          fileName: msg.fileName
        }

    );
});
 
    socket.on('connect', function () {
         onConnect(socket);  
         roommeesage(socket)     
    }); 
    socket.on('create', function (data) {
      var dat=JSON.parse(JSON.stringify(data))
      socket.join(dat["interviewtoken"])
      roomlist.push(dat["interviewtoken"])
      // socketio.sockets.in(dat["interviewtoken"]).emit('list',true)
      Object.values(collaborations[socket_id_to_session_id[socket.id]]['participants']).forEach(i=>{
          socketio.to(i).emit("list",true)
      })
  });
  socket.on("codeoutput",function(data){
    socketio.sockets.in(roomie).emit('gotoutput',data)
  })
  socket.on('listofrooms',function(data){
    if(roomlist.includes(data)){
      socketio.sockets.in(roomie).emit('list',true)
    }else{
       socketio.sockets.in(roomie).emit('list',false)
    }
   
  })
socket.on("timer",function(data){
  socketio.sockets.in(roomie).emit('ontimer', data);
})
 socket.on('selectlang',function(lang){
        socketio.sockets.in(roomie).emit('onchangelang', lang);
 })
  socket.on('join', function (data) {
    

    // data=JSON.parse(data)
    var dat=JSON.parse(JSON.stringify(data))
    // roomparticipants.push(dat["userid"])
    socket.join(dat["interviewtoken"])
    // socket.join(data.interviewtoken)
    // socket.emit('list',roomlist)
      socketio.sockets.in(dat["interviewtoken"]).emit('ready', socket.id);
  });


  socket.on("compilecount",function(data){
    if(examusersession[uid]){
      examusersession[uid]["compilecount"]=data
    }
  })
     socket.on('examtime',function(event){
      var date =  new moment()
      var current_hour = date
      uid=event["userid"]
      var obj={
        "question":event.question,
        "time":event.time,
        "actualtime":current_hour,
        "level":event.level,
        "testid":event.testid,
        "compilecount":event.compilecount,
        "tempcode":event.tempcode,
        "language_name":event.language_name,
        "allquestions":event.allquestions
       }      // collaborations[roomie]["current_hour"]=current_hour
     examusersession[uid]=obj

     })
  
     socket.on('isExamQuestion',function(data){

      if(examusersession[data.toString()]){

var datad=JSON.parse(JSON.stringify(examusersession[data.toString()]))
var date =  new moment()
var duration=moment.duration(date.diff( data["endtime"]))
duration=datad["timeleft"]+duration.asMinutes()
// console.log(duration,"add")
duration=datad["time"]-duration
// console.log(duration,"sub")
if(duration>0){
  datad["timeleft"]=duration
}else{
  datad["timeleft"]=0
}

  examusersession[data.toString()]=datad
  socket.emit("examleft",examusersession[data])
      }else{
        socket.emit("examleft",false)
      }
    })

//     socket.on('isUserSession',function(data){

//       if(examusersession[data.toString()]){
// console.log(examusersession[data.toString()])
//        socket.emit("UserSession",true)
//       }else{
//         socket.emit("UserSession",false)
//       }
//     })

  socket.on('candidate', function (event) {
      socketio.sockets.in(event.sendTo).emit('candidate', event);
  });

  socket.on('offer', function (event) {
      socketio.sockets.in(event.receiver).emit('offer', { event: event.sdp, caller: socket.id });
  });

  socket.on('answer', function (event) {
      socketio.sockets.in(event.caller).emit('answer', event.sdp);
  });

   
  });
  function write_file( path, data ) {
    try {
        fs.writeFileSync( path, data ) ;
        return true ;
    } catch( e ) {
        return false ;
    }
}
 
 
function read_file( path ) {
    try {
        var data = fs.readFileSync( path ) ;
        return data ;
    } catch( e ) {
        return false
    }
}
 

function file_exists( path ) {
    try {
        stats = fs.lstatSync( path ) ;
        if (stats.isFile()) {
            return true ;
        }
    } catch( e ) {
        return false ;
    }
    // we should not reach that point
    return false ;
}
};
// exports=module.exports=socketio