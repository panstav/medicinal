'use strict';

var fs = require('fs');
var config = require('../config');
var sm = require('sitemap');

module.exports = (outputPath, urls, callback) => {
	let sitemap = sm.createSitemap({ urls, hostname: config.domain });

	fs.writeFile(outputPath, sitemap.toString(), callback);
};