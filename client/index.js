var http = require('nanoajax');

var notify = require('./notify');
var isValidEmail = require('../is-valid-email.js');

onReady(() => {

	setNewsletterAction();

	setContactAction();

});

function setNewsletterAction(){

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

function setContactAction(){

	document.querySelector('.contact button').addEventListener('click', () => {

		var contactText = document.querySelector('.contact textarea').value;

		if (!contactText) return wontSendEmpty();

		var httpOptions = {
			method: 'POST',
			url: '/api/send-contact-form',
			body: `contact=${ contactText }`
		};

		http.ajax(httpOptions, (code, response, request) => {

			switch (code){

			case 500:
				return notify.serverError();

			case 400:
				return wontSendEmpty();

			case 200:
				return notify('תודה על השיתוף והמשך נעים.');
			}

		});

		function wontSendEmpty(){
			notify.error('לא ניתן לשלוח טופס ריק.');
		}

	});

}

function onReady(fn){ // http://youmightnotneedjquery.com/#ready
	if (document.readyState != 'loading') return fn();
	document.addEventListener('DOMContentLoaded', fn);
}