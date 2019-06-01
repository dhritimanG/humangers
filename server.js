/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express      = require('express');
const path         = require('path');
const http         = require('http');
const bodyParser   = require('body-parser');
const app          = express();
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const port         = process.env.PORT || '3100';
const passport     = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'nsjbwd ndwbd' }));
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);

require("./assignment/app.js")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});


server.listen( port , () => console.log('Running'));
