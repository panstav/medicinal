'use strict';

var emailjs = require('emailjs');

module.exports = (req, res) => {

	var contactText = req.body.contact;

	if (!contactText || typeof(contactText) !== 'string') return res.status(400).end();

	let smtpOptions = {
		user: process.env.EMAIL_USERNAME,
		password: process.env.EMAIL_PASSWORD,
		host: process.env.EMAIL_HOSTNAME,
		ssl: true
	};

	let emailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: process.env.EMAIL_USERNAME,
		subject: 'New message through Contact-Us form @ Medicinal.co.il',
		text: contactText
	};

	emailjs.server.connect(smtpOptions).send(emailOptions, err => {
		if (err){
			console.log(err);

			return res.status(500).end();
		}

		res.status(200).end();
	});
};