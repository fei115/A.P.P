var express = require('express');
var app = express();

var mongoose = require('./config/db.js');

/* Third party middleware */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* Routes */
var User = require('./routes/user.js');

/* To parse URL encoded data */
app.use(bodyParser.urlencoded({ extended: true }))
/* To parse json data */
app.use(bodyParser.json())
/* To parse cookie */
app.use(cookieParser())


/* Use routes */
app.use('/api', User);

/* catch 404 and forward to error handler */
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});
	
/* An error handling middleware */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
