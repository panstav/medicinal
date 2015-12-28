var common = require('../../common');

var sharer = require('../includes/sharer');

module.exports = sharerCtrl;

function sharerCtrl(){

	// on click of each share button - open that platfroms dialog
	forEachElem('.sharer li', elem => { elem.addEventListener('click', () => {
		let platform = elem.getAttribute('platform');

		sharer[platform](common.domain, 'בקרוב יעלה פה אתר חדש למטופלי הקנאביס בארץ!');
	})});

}

function forEachElem(selector, iterator){
	let elementsArr = document.querySelectorAll(selector);
	[].forEach.call(elementsArr, iterator);
}