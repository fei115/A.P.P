var expressJwt = require('express-jwt');  
var config = require('../config/config.js');

module.exports = expressJwt({
  secret: config.jwtSecretKey,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});