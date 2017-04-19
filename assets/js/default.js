$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});
$(document).ready(function(){
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 40
  })
  $('a.scrollto').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 40)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
  });

  //parallax
  $('.parallax-window').parallax();
});

// RSVP Form - jquery validation
$("#rsvpForm").validate({
  rules: {
    guestName: {
      required: true
    },
    guestEmail: {
      required: true
    },
    guestMessage: {
      required: false
    }
  }
});

// wow
new WOW({
    offset: 50
}).init();

// Back to Top
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}

// Gallery
document.getElementById('gallery').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
   blueimp.Gallery(links, options);   
};

$('#rsvp-form-submit').on('click',function(){
  if($("#rsvpForm").valid()) {
    var name = $("input#guestName").val();
    var email = $("input#guestEmail").val();
    var message = $("textarea#guestMessage").val();
    var firstName = name;

    if (firstName.indexOf(' ') >= 0) {
      firstName = name.split(' ').slice(0, -1).join(' ');
    }
    $.ajax({
      url: window.APP_CONFIG.apiHost + "/mail",
      type: "POST",
      data: {
        name: name,
        email: email,
        message: message
      },
      success: function(response){
        console.log(response);
        if(response == 'success')
        {
          $('#submitMessage').html("<div class='alert alert-success'>");
          $('#submitMessage > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#submitMessage > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#submitMessage > .alert-success')
            .append('</div>');
          $('#submitMessage').delay(3000).fadeOut();
          //clear all fields
          $('#rsvpForm').trigger("reset");
        }
        else{
          $('#submitMessage').html("<div class='alert alert-danger'>");
          $('#submitMessage > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#submitMessage > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
          $('#submitMessage > .alert-danger').append('</div>');
          $('#submitMessage').delay(3000).fadeOut();
          //clear all fields
          $('#rsvpForm').trigger("reset");
        }
      }
    })
  }
});

