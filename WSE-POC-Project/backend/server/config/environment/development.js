'use strict';
const { Client } = require('pg')

const client = new Client({
  // connectionString: connectionString,
  host: 'poc.cngnjkb0fvj3.ap-south-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'Password1234*',
  database: 'wse',
  port: 5432,
  idleTimeoutMillis: 300000,
})
// client.connect();

//self.configureExpress(pool);
client.connect(function (err) {
  if (err) {
    console.log(err)
    console.log("\n\t *** Cannot establish a connection with the database. ***");
    client = reconnect(client);
  }
  else {
    console.log("\n\t *** New connection established with the database. ***")
  }
})

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
};