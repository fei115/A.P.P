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

function sendMail(mailOptions) {
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return error;
		} else {
			return { success: true, message: 'Email sent' };
		}
	})
};

module.exports = {
	sendMail
}
