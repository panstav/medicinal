var onReady = require('./includes/on-ready');

var activatedControllers = [
	require('./controllers/newsletter'),
	require('./controllers/contact')
];

// when ready, execute each controller
onReady(() => activatedControllers.forEach(controller => controller()));