'use strict';

var express = require('express');
var bodyParser = require('body-parser');

// Start a new server, set it up and return it.
module.exports.init = () => {

	// Boing
	let server = express();

	// register main route
	server.get('/', mainRoute);

	// Serve static files
	server.use(express.static('public'));

	// set body json at req.body
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	// api
	server.use('/api/add-to-newsletter', require('./add-to-newsletter'));
	server.use('/api/send-contact-form', require('./send-contact-form'));

	// set 404 fallback
	server.use(fourOfour);

	return server;

};

function mainRoute(req, res){
	res.sendFile('index.html', { root: 'public' });
}

function fourOfour(req, res){

	// serve main page if html is accepted
	if (req.accepts('html')) return res.status(404).sendFile('index.html', { root: 'public' });

	// otherwise simply send a 404
	res.status(404).end();
}
