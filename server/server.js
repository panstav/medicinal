'use strict';

var express = require('express');
var limiter = require('express-rate-limit');
var bodyParser = require('body-parser');

const maxAgeCache = process.env.NODE_ENV !== 'production' ? 0 : 1000*60*60*24*7;

// Start a new server, set it up and return it.
module.exports.init = () => {

	// Boing
	let server = express();

	// register main route
	server.get('/', mainRoute);

	// Serve static files, cache for a week
	server.use(express.static('public', { maxAge: maxAgeCache }));

	// set body json at req.body
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	//-=======================================================---
	//------------------ API
	//-=======================================================---

	// every minute, allow maximum of 5 connections to go
	// before sending 429 too many requests
	server.use(limiter(
		{
			windowMs: 1000 * 60 * 60, // an hour
			max: 3,
			delayAfter: 0,
			delayMs: 0
		}
	));

	// setup routes
	server.use('/api/add-to-newsletter', require('./add-to-newsletter'));
	server.use('/api/send-contact-form', require('./send-contact-form'));

	// set 404 fallback
	server.use(fourOfour);

	return server;

};

function mainRoute(req, res){
	res.sendFile('index.html', { root: 'public', maxAge: maxAgeCache });
}

function fourOfour(req, res){

	// serve main page if html is accepted
	if (req.accepts('html')) return res.status(404).sendFile('index.html', { root: 'public' });

	// otherwise simply send a 404
	res.status(404).end();
}
