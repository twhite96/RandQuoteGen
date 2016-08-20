var postedQuote = '';
$(document).ready(function() {
	$('#new-quote').on('touchstart click', function(e) {
		e.preventDefault();
		$.ajax({
			url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
			success: function(data) {
				var post = data.shift(); // The data is an array of posts. Grab the first one.

				$('p').html(post.content);
				postedQuote = $(post.content)[0].innerText;

				$(postedQuote).fadeIn('slow');

				// If the Source is available, use it. Otherwise hide it.
				if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
					$('#quote-source').html('Source: ' + post.custom_meta.Source);
				} else {
					$('#quote-source').text('');
				}
			},
			cache: false
		});
	});
	$('#tweet-quote').on('click', function(e) {
		//We tell our browser not to follow that link
		e.preventDefault();
		//We get the URL of the link
		window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + postedQuote);
	});
});
