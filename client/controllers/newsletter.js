var http = require('nanoajax');

var isValidEmail = require('../../common/is-valid-email.js');
var notify = require('../includes/notify');

module.exports = newsletterCtrl;

function newsletterCtrl(){

	document.querySelector('.newsletter button').addEventListener('click', () => {

		var email = document.querySelector('.newsletter input').value;

		if (!email) return;

		if (!isValidEmail(email)) return badEmail();

		var httpOptions = {
			method: 'POST',
			url: '/api/add-to-newsletter',
			body: `email=${ email }`
		};

		http.ajax(httpOptions, (code, response, request) => {

			switch (code){

			case 500:
				return notify.serverError();

			case 400:
				return badEmail();

			case 200:
				return notify('כתובת המייל נרשמה בהצלחה ברשימת התפוצה.');

			case 208:
				return notify.error('כתובת המייל כבר רשומה במערכת.');
			}

		});

		function badEmail(){
			notify.error('כתובת המייל שהקשת לא תקפה.');
		}

	});

}
