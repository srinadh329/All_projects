var express = require('express');
var path = require('path');
var app=express();
var bodyParser = require('body-parser');


  const cors = require('cors');
  const originurl="http://localhost:4200"
  
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

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"})); // For the request entity too large(413 error code)
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// app.use('/certifications', express.static('../backend/uploads/certifications'));
// app.use('/photos', express.static('../backend/uploads/photos'));
// app.use('/ticketphotos', express.static('../backend/uploads/ticketphotos'));

var app = express();
var server = require('http').createServer(app);

  

  