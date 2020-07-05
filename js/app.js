var quoteBox = '';

$(document).ready(function() {
	$('#new-quote').on('touchstart click', function(e) {
		e.preventDefault();
		var url = 'https://api.quotable.io/random';

		// Give the paragraph for quotes a class name to be precise
		quoteBox = $('.js-quoteBox');
		// I chose to give it .js-quoteBox
		// Hide it in the DOM (You should do this in CSS instead)
		quoteBox.hide();
		// Make the request
		$.getJSON(url, function(data) {
			console.log(`${data.content} —${data.author}`)
			// Use response here to modify the DOM
			quoteBox.html(data.content)[0].innerText;
			// Now you can fade the js-quoteBox back into the DOM
			quoteBox.fadeToggle(1000, function() {
				$(this).html(data.content);
				// Show source if available
				if (typeof data.author !== 'undefined') {
					$('#quote-source').html('— ' + data.author);
				} else {
					$('#quote-source').text('');
				}
			})
     })
		$('#tweet-quote').on('click', function(e) {
			//We tell our browser not to follow that link
			e.preventDefault();
			//We get the URL of the link
			window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteBox.text());
			console.log(quoteBox);
		});

	});
});
