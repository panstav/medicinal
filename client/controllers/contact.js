var http = require('nanoajax');

var notify = require('../includes/notify');

module.exports = contactCtrl;

function contactCtrl(){

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