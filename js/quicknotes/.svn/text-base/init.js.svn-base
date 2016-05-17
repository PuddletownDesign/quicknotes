if(Modernizr.localstorage) {
	head.js(
		"js/quicknotes/localstorage.js",
		"js/quicknotes/controller.js"	
	);
} 
//everything has failed
else {
	$('<div id="nope">Your browser is so old an\' antiquated it makes ur momz look young. Lets get this straight...</div> \
	<ul>\
		<li>Your browser doens\'t support sqlite storage</li>\
		<li>Your browser doens\'t support native HTML5 local storage</li>\
		<li>Your browser doens\'t support libraries designed for backwards compatibility local storage</li>\
		<li>Your browser is doomed.</li>\
	</ul>').appendTo('#quicknotes');
}