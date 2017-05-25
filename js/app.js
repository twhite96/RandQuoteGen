var quoteBox = '';

$(document).ready(function() {
  $('#new-quote').on('touchstart click', function(e) {
    e.preventDefault();
    var url = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=';

    // Give the paragraph for quotes a class name to be precise
    quoteBox = $('.js-quoteBox');
    // I chose to give it .js-quoteBox
    // Hide it in the DOM (You should do this in CSS instead)
    quoteBox.hide();
    // Make the request
    $.ajax({
      url: url,
      method: 'get',
      cache: false
    }).done(function(res) {
      // Use response here to modify the DOM
      var post = res.shift();
      quoteBox.html(post.content)[0].innerText;
      // Now you can fade the js-quoteBox back into the DOM
      quoteBox.fadeToggle(1000, function() {
        $(this).html(post.content);
        // Show source if available
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      })

    });
    $('#tweet-quote').on('click', function(e) {
      //We tell our browser not to follow that link
      e.preventDefault();
      //We get the URL of the link
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteBox.text());
      console.log(quoteBox);
    });

  });
});
