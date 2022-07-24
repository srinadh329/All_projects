'use strict';
const { Client } = require('pg')

const client = new Client({
  // connectionString: connectionString,
  host: '',
  user: '',
  password: '',
  database: '',
  port: 5432,
  idleTimeoutMillis: 300000,
})


client.getConnection((err, connection) => {
  if (err) {
    console.log("err",err)
      // if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      //     console.error('Database connection was closed.')
      // }
      // if (err.code === 'ER_CON_COUNT_ERROR') {
      //     console.error('Database has too many connections.')
      //     console.error('Database has too many connections.')
      // }
      // if (err.code === 'ECONNREFUSED') {
      //     console.error('Database connection was refused.')
      // }
  }
 
  if (connection) connection.release();
  return
})
client.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});

function reconnect(connection){
  console.log("\n New connection tentative...");
  //- Destroy the current connection variable
  if(connection) connection.destroy();
  //- Try to reconnect
  client.connect(function(err){
      if(err) {
          //- Try to connect every 2 seconds.
          setTimeout(reconnect, 2000);
      }else {
          console.log("\n\t *** New connection established with the database. ***")
          return client;
      }
  });
}
// Development specific configuration
// ==================================
module.exports = {
  
  client,
  dburi: '',
  
  frontendUrl:'http://localhost:4200',
  serverUrl:'http://localhost:4000',


  aiUrl:'',
  adminMail:'',
  fcmtoken: 'AAAAjEL6QTs:APA91bHElH0SIz2uot2DZm7c-c9PBkBNu_olqUZq8XVIGTqN0o9r7CM7OLEXNgeZtgasDg_EibiUVMYyepSvVWLafTsVXBoiqAg_wfo5J1ekOYrqSQihnAmj_zvifBM6AXjlBcsO0kpG',
  seedDB: false,
  // redisClient 
};