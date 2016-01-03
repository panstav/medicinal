var common = require('../common');

var onReady = require('./includes/on-ready');

var activatedControllers = [
	require('./controllers/newsletter'),
	require('./controllers/contact'),
	require('./controllers/sharer')
];

// when ready, execute each controller
onReady(() => activatedControllers.forEach(controller => controller()));

// single page thing - so simply redirect if address doesn't match hard-coded one
if (location.href !== common.domain && location.href !== common.domain + '/'){
	location.href = common.domain;
}