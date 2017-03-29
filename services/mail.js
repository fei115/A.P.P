'use strict';

var nodemailer = require('nodemailer');
var config = require('../config/config.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.address,
        pass: config.email.password
    }
});

/**
 * Sends an email via eztextbook's email account
 * See link for detail: https://nodemailer.com/about/
 */
function sendMail(mailOptions, cb) {
	transporter.sendMail(mailOptions, cb);
}

module.exports = {
	sendMail
}
