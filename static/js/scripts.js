
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').height());
	});
	// toggle "navbar-no-bg" class
	$('.c-form-1-box').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});

    /*
        Background slideshow
    */
    $('.top-content').backstretch("../static/img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("../static/img/backgrounds/2.jpg");
    $('.testimonials-container').backstretch("../static/img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("../static/img/backgrounds/2.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(){
    	$('.testimonials-container').backstretch("resize");
    });


    /*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});

	/*
	    Contact form
	*/
	$('.c-form-1-box form input[type="text"], .c-form-1-box form textarea').on('focus', function() {
		$('.c-form-1-box form input[type="text"], .c-form-1-box form textarea').removeClass('contact-error');
	});


});


jQuery(window).load(function() {

	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");

});

$("form").submit(function(e) {
	var form = this;
	e.preventDefault();
	var formData = $('form').serializeArray();
	$('#loadingmessage').show();
	$("#demo-submit-form-button").attr("disabled", true);
	$.ajax({
	    url: "/demo-submit-form",
	    data: formData,
	    type: 'POST',
	    success: function(response) {
	      if (response == 'username'){
	        $('#error').text("Username already exists!")
	      }
	      else if (response == 'company') {
	        $('#error').text("Company already exists!")
	      }
	      else if (response == 'email') {
	        $('#error').text("Email already exists!")
	      }
	      else {
	        $('#loadingmessage').show();  // show the loading message.
	        $.ajax({
	          url: '/demo-submit-form-validate',
	            type: 'POST',
	            data: formData,
	            success: function(result) {
	              $('#loadingmessage').hide();
	              $('#error').text("")
	              $('#success').text("Great! Check your email!");
	              console.log(result);
	            },
	            error: function(result){
	              console.log(result);
	              $('#loadingmessage').hide();
	              $('#error').text("There was an error with your submission!")
								$("#demo-submit-form-button").attr("disabled", false);
	            }
	        });
	      }
	    }
	});
});
