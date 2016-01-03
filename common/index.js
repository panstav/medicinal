'use strict';

let isLocal = process.env.LOCAL;

module.exports = {
	domain: isLocal ? 'http://localhost:3000' : 'http://www.medicinal.co.il',

	fullTitle: 'מדיסינאל - הזנים, הספקים והדיונים כולם - באתר אחד.'
};