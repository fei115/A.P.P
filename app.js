var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path')

var mongoose = require('./config/db.js'); 
var passport = require('./middlewares/passport.js');
var expressJwtAuth = require('./middlewares/jwtAuth.js'); 
 
/* Configuration */
var port = process.env.PORT || 3000;

/* Third Party Middle-wares */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
	
/* Statics */
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/', express.static(__dirname + '/public/htmls'));

/* Routes */
var User = require('./routes/user.js');
var Book = require('./routes/book.js');
var Post = require('./routes/post.js');
var Auth = require('./routes/auth.js');
var Image = require('./routes/image.js');
var Admin = require('./routes/admin.js');

/* Protect Routes */
app.use(/^\/api(?!\/auth).*$/, expressJwtAuth);

/* Use routes */
app.use('/api', User);
app.use('/api', Book);
app.use('/api', Post);
app.use('/api', Auth);
app.use('/api', Image);
app.use('/api', Admin);
	
/* An error handling middleware */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.send({ success: false, message: err.message });
});


app.listen(port, function () {
  console.log('Listening on port', port);
});

module.exports = app;
