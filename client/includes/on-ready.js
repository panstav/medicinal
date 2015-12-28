// http://youmightnotneedjquery.com/#ready

module.exports = function onReady(fn){
	if (document.readyState != 'loading') return fn();
	document.addEventListener('DOMContentLoaded', fn);
};