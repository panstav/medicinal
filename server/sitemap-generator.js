'use strict';

var fs = require('fs');
var common = require('../common');
var sm = require('sitemap');

module.exports = (outputPath, urls, callback) => {
	let sitemap = sm.createSitemap({ urls, hostname: common.domain });

	fs.writeFile(outputPath, sitemap.toString(), callback);
};