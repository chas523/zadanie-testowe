"use strict"; 

$(function() {
    $("form").validate({
        rules: {
            name: {
                required: true,
                minlength: 4
            },            
            email: {
                required: true
            },
            subject: { 
                required: true, 
                maxlength: 60
            },  
            message: {
                required: true, 
            }
        },
        //For custom messages
        messages: {
            name:{
                required: "Enter a username",
                minlength: "Enter at least 4 characters"
            },
            subject: {
                maxlength:  "Maximum length 60 characters"
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          let placement = $(element).data('error');
          if (placement) {
            $(placement).append(error); 
          } else {
            error.insertAfter(element);
          }
        }
    });
    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });
    $( ".hamburger").on('click', function(e) {
        $('.hamburger').toggleClass("is-active");
        $('.header').toggleClass("header-active");
        $('body').toggleClass("hidden");
        e.preventDefault(); 
    });  
}); 


