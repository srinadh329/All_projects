var express = require('express');
var path = require('path');
var app=express();
var bodyParser = require('body-parser');
  const cors = require('cors');
  const originurl="http://172.16.1.128:4200"
  
  app.use(cors({
    origin: [
        originurl
    ], credentials: true
}));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", originurl);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





  

  