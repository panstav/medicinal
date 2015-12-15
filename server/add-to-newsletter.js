'use strict';

var _ = require('lodash');
var md5 = require('md5');

var Mailchimp = require('mailchimp-lite');

var isValidEmail = require('../is-valid-email.js');

module.exports = (req, res) => {

	var email = req.body.email;

	// given email is valid or send 404
	if (!email || !isValidEmail(email)) return res.status(400).end();

	// send email to newsletter list
	subscribeEmail({ email }, resConfirm, err => {

		// user might already be subscribed
		if (_.get(err, 'response.body.title') === 'Member Exists'){
			
			// attempt resending subscription request, respond as if subscribed just now
			return subscribeEmail({ email, reconfirm: true }, resConfirm, (err) => {
				console.log(err);

				res.status(500).end();
			});
		}

		// otherwise simply reject request as system error
		res.status(500).end();
	});

	function resConfirm(){ res.status(200).end() }
};

function subscribeEmail(request, yep, nope){

	let mailchimp = new Mailchimp({
		key: process.env.MAILCHIMP_APIKEY,
		datacenter: process.env.MAILCHIMP_DATACENTER
	});

	let subscriber = { email_address: request.email, status: 'pending' };

	var method = 'post';
	var url = `/lists/${process.env.MAILCHIMP_MEDICINAL_LISTID}/members/`;

	if (request.reconfirm){
		method = 'put';
		url += md5(request.email.toLowerCase());
	}

	mailchimp[method](url, subscriber).then(yep).catch(nope);
}