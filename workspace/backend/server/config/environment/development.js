'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
   uri: 'mongodb://developer:mlab0065@ds125525.mlab.com:25525/docintact'
      // uri: 'mongodb://developer:123456pP@cluster0-shard-00-00-ewobx.mongodb.net:27017,cluster0-shard-00-01-ewobx.mongodb.net:27017,cluster0-shard-00-02-ewobx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  },
  frontendUrl:'http://192.168.1.39:4200',
  python:'https://pythonstage.docintact.com',

  seedDB: false
};
