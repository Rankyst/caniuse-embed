(function() {

	var caniuse_embeds = document.getElementsByClassName("ciu_embed");

	for (var i = 0; i < caniuse_embeds.length; i++) {

		var embed = caniuse_embeds[i];
		var feature = embed.getAttribute('data-feature');
		var periods = embed.getAttribute('data-periods');

		if (feature) {

			var url = '//caniuse.bitsofco.de/embed/index.html';
			//var url = 'http://localhost:8000/embed/index.html'

			var iframe = '<iframe src="'+url+'?feat='+feature+'&periods='+periods+'" frameborder="0" width="100%" height="400px"></iframe>';

			embed.innerHTML = iframe;

		} else {

			embed.innerHTML = "A feature was not included. Go to <a href='http://caniuse.bitsofco.de/#how-to-use'>http://caniuse.bitsofco.de/#how-to-use</a> to generate an embed.";
		}
	}



	// GET RESPONSIVE HEIGHT PASSED FROM IFRAME

	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	eventer(messageEvent,function(e) {
		var data = e.data;
		if (  (typeof data === 'string') && (data.indexOf('ciu_embed') > -1) ) {

		 	var featureID = data.split(':')[1];
		 	var height = data.split(':')[2];

		 	for (var i = 0; i < caniuse_embeds.length; i++) {

		 		var embed = caniuse_embeds[i];
		 		
				if ( embed.getAttribute('data-feature') === featureID ) {
					var iframeHeight = parseInt(height) + 30;
					embed.childNodes[0].height = iframeHeight + 'px';
					break;
				}
			}
		} 
	},false);


}).call(this);