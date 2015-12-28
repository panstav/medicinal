var dialog = require('share-dialog');

const facebookAppID = '';

module.exports = { facebook, twitter, google };

function facebook(url){
	dialog.facebook(url).open();
}

function twitter(url, shareString){
	dialog.twitter(url, shareString).open();
}

function google(url){
	dialog.gplus(url).open();
}