var express = require('express');
var app = express();
var mongoose = require('./config/db.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* Routes */
var User = require('./routes/user.js');
var Book = require('./routes/book.js');
var Post = require('./routes/post.js');

/* To parse URL encoded data */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* To parse cookie */
app.use(cookieParser())

/* Use routes */
app.use('/api', User);
app.use('/api', Book);
app.use('/api', Post);
	
/* An error handling middleware */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

module.exports = app;
