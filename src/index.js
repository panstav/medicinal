var http = require('nanoajax');

var isValidEmail = require('../is-valid-email.js');

onReady(() => {

	setNewsletterAction();

	setContactAction();

});

function setNewsletterAction(){

	document.querySelector('.newsletter button').addEventListener('click', () => {

		var email = document.querySelector('.newsletter input').value;

		if (!isValidEmail(email)) return badEmail();

		var httpOptions = {
			method: 'POST',
			url: '/api/add-to-newsletter',
			body: `email=${ email }`
		};

		http.ajax(httpOptions, (code, response, request) => {

			switch (code){

			case 500:
				return alert('System error');

			case 400:
				return alert('Bad request');

			case 200:
				return alert('Sababa');

			case 208:
				return alert('Already registered');
			}

		});
	});

}

function setContactAction(){

	document.querySelector('.contact button').addEventListener('click', () => {

		var contactText = document.querySelector('.contact textarea').value;

		var httpOptions = {
			method: 'POST',
			url: '/api/send-contact-form',
			body: `contact=${ contactText }`
		};

		http.ajax(httpOptions, (code, response, request) => {

			switch (code){

			case 500:
				return alert('System error.');

			case 400:
				return alert('Bad request');

			case 200:
				return alert('Sababa');
			}

		});

	});

}

function onReady(fn){ // http://youmightnotneedjquery.com/#ready
	if (document.readyState != 'loading') return fn();
	document.addEventListener('DOMContentLoaded', fn);
}