$(document).ready(function(){
   $('#new-quote').on('touchstart click', function(e){
     e.preventDefault();
	   var url = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=';
     // Give the paragraph for quotes a class name to be precise
     // I chose to give it .js-quoteBox
     // Hide it in the DOM (You should do this in CSS instead)
     $('p.js-quoteBox').hide();
     // Make the request
     $.ajax({
       url: url,
       method: 'get'
     }).done(function(res){
       // Use response here to modify the DOM
       var post = res.shift();
       $('p.js-quoteBox').html(post.content);
       // Now you can fade the js-quoteBox back into the DOM
       $('p.js-quoteBox').fadeIn('slow');
       // Show source if available
       if(post.custom_meta.Source.length > 0){
         // And I use .text() over .html() since we only need text inserted
         $('#quote-source').text('Source: ' + post.custom_meta.Source);
       }
     });
     $('#tweet-quote').on('click', function(e) {
   		//We tell our browser not to follow that link
   		e.preventDefault();
   		//We get the URL of the link
   		window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + postedQuote)
    });
  });
