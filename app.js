var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var jwt = require('jsonwebtoken');

var mongoose = require('./config/db.js'); // handles db connection
var config = require('./config/config.js');

/* Configuration */
var port = process.env.port || 3000;
app.set('secretKey', config.secret);

/* To parse URL encoded data */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* To parse cookie */
app.use(cookieParser())

// use morgan to log requests to the console
app.use(morgan('dev'));

/* Routes */
var User = require('./routes/user.js');
var Book = require('./routes/book.js');
var Post = require('./routes/post.js');

/* Use routes */
app.use('/api', User);
app.use('/api', Book);
app.use('/api', Post);
	
/* An error handling middleware */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, function () {
  console.log('Listening on port 3000!');
});

module.exports = app;
