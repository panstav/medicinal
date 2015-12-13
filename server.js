'use strict';

// Main Dish
var express = require('express');

// Start a new server, set it up and return it.
module.exports.init = () => {

	// Boing
	let server = express();

	// register main route
	server.get('/', mainRoute);

	// Serve static files
	server.use(express.static('public'));

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
