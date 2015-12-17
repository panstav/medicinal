var humane = require('humane-js');

humane.error = humane.spawn({ addCls: 'humane-libnotify-info' });

function notify(msg, method){
	if (method) return humane[method](msg);

	humane.log(msg);
}

notify.error = msg => notify(msg, 'error');

notify.serverError = () => notify('אירעה אצלנו שגיאה, נסו מאוחר יותר.', 'error');

module.exports = notify;