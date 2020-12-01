(function($) {
    "use strict";


    /*=====================================
     Start Loading
     =====================================*/
    $(window).on('load', function () {
        $('#loading').fadeOut(1000);
        setTimeout(function(){
        	$('#bg').addClass('overlay');
        },1000);
        setTimeout(function(){
        	$('.content, .social-footer, .icon-btn').removeClass('initial');
        },1600);
    });
    /*=====================================
     End Loading
     =====================================*/



    $(document).ready(function(){
    	/* Conditions to see what type of page it is */
    	if($('body').hasClass('light')){

	    	/*=====================================
	    	Start Background slider
	    	=====================================*/
	    	glasSlider({
			   images: [
			            './assets/img/bg1.jpg',
			            './assets/img/bg2.jpg', 
			            './assets/img/bg3.jpg'
			           ],
			    opacity: 0.6,
			    delay: 6000
			});
	    	/*=====================================
	    	 End Background slider
	    	 =====================================*/

	    } else if ($('body').hasClass('dark')){

	    	/*=====================================
	    	Start Background slider
	    	=====================================*/
	    	glasSlider({
			   images: [
			            './assets/img/bg4.jpg',
			            './assets/img/bg5.jpg', 
			            './assets/img/bg6.jpg'
			           ],
			    opacity: 0.6,
			    delay: 6000
			});
	    	/*=====================================
	    	 End Background slider
	    	 =====================================*/

	    } else if($('body').hasClass('youtube-background')){

	    	/*=====================================
	    	Start Youtube Background
	    	=====================================*/
			$("#bgyoutube").YTPlayer();
			/*=====================================
	    	End Youtube Background
	    	=====================================*/
    	    

	    } else if ($('body').hasClass('fullpage')){
	    	/*=====================================
	    	Start Fullpage JS
	    	=====================================*/
	    	$('#fullpage').fullpage({
	    		navigation: true,
				navigationPosition: 'right'
	    	});
	    	/*=====================================
	    	End Fullpage JS
	    	=====================================*/

	    	/*=====================================
	    	Start Background slider
	    	=====================================*/
	    	glasSlider({
			   images: [
			            './assets/img/bg4.jpg',
			            './assets/img/bg5.jpg', 
			            './assets/img/bg6.jpg'
			           ],
			    opacity: 0.6,
			    delay: 6000
			});
	    	/*=====================================
	    	 End Background slider
	    	 =====================================*/
	    }

    	

    	/*=====================================
    	Start More Info Popup
    	=====================================*/
		$('.actions .more-info').on('click', function(){
		 	$('#more-info').addClass('active');
		});
		/*=====================================
    	End More Info Popup
    	=====================================*/

    	/*=====================================
    	Start Subscribe Popup
    	=====================================*/
		$('.actions .subscribe').on('click', function(){
		 	$('#subscribe').addClass('active');
		});
		/*=====================================
    	End Subscribe Popup
    	=====================================*/


    	/*=====================================
    	Start Popup Close button
    	=====================================*/
		$('.close-action').on('click', function(){
		 	$(this).closest('.popup').removeClass('active');
		});
		/*=====================================
    	End Popup Close button
    	=====================================*/


    	/*=====================================
    	Start Contact Form
    	=====================================*/

    	$("#contact-form [type='submit']").click(function(e) {
	        e.preventDefault();
	        
	        // Get input field values of the contact form
	        var user_name       = $('input[name=name]').val();
	        var user_email      = $('input[name=email-address]').val();
	        var user_subject    = $('input[name=subject]').val();
	        var user_message    = $('textarea[name=message]').val();
	       
	        // Datadata to be sent to server
	        var post_data = {'userName':user_name, 'userEmail':user_email, 'userSubject':user_subject, 'userMessage':user_message};
	       
	        // Ajax post data to server
	        $.post('./assets/php/contact-me.php', post_data, function(response){  
	           
	            // Load json data from server and output message    
	            if(response.type == 'error') {

	                var output = '<div class="error-message"><p>'+response.text+'</p></div>';
	                
	            } else {
	           
	                var output = '<div class="success-message"><p>'+response.text+'</p></div>';
	               
	                // After submission, all the fields are reseted
	                $('#contact-form .form-control').val('');
	                
	            }
	           
	            $("#answer").hide().html(output).fadeIn();

	        }, 'json');

	    });
	   
	    // Reset and hide all messages on .keyup()
	    $("#contact-form input, #contact-form textarea").keyup(function() {
	        $("#answer").fadeOut();
	    });

    	/*=====================================
    	End Contact Form
    	=====================================*/


    	/*=====================================
    	Notify Me - Newsletter 
    	=====================================*/
    	$("#notifyMe").notifyMe();
    	/*=====================================
    	End Notify Me
    	=====================================*/
		
    }); 

})(jQuery);