"use strict";

var expressJwt = require('express-jwt');  
var config = require('../config/config.js');

/** A middleware to extract the token from the request
 *  and verify it against the secret key.
 */
module.exports = expressJwt({
  secret: config.jwt.secretKey,
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