$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
});
$(document).ready(function(){
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 40
  });
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
// document.getElementById('gallery').onclick = function (event) {
//     event = event || window.event;
//     var target = event.target || event.srcElement,
//         link = target.src ? target.parentNode : target,
//         options = {index: link, event: event},
//         links = this.getElementsByTagName('a');
//    blueimp.Gallery(links, options);
// };

function is_touch_device() {
    return !!('ontouchstart' in window) // works on most browsers
        || !!('onmsgesturechange' in window); // works on ie10
}

function ToggleDrag(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.margin = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Cliquez pour activer ou désactiver le contrôle de la map';
    controlDiv.appendChild(controlUI);

    var a = document.createElement("div");
    a.className += "gm-style-mtc";
    controlUI.appendChild(a);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontSize = '11px';
    controlText.style.padding = '8px';
    controlText.style.boxShadow = "0px 1px 4px -1px rgba(0, 0, 0, 0.298039)";
    controlText.innerHTML = map.draggable ? 'Désactiver le contrôle de map' : "Activer le contrôle de map";
    a.appendChild(controlText);

    controlUI.addEventListener('click', function() {
        map.setOptions( {
            draggable: !map.draggable
        });
        controlText.innerHTML = map.draggable ? 'Désactiver le contrôle de map' : "Activer le contrôle de map";
    });
}

function initMap() {
    // https://developers.google.com/maps/documentation/javascript/reference#Marker
    // https://developers.google.com/maps/documentation/javascript/infowindows#open
    var coordMarker1 = {lat: 49.1725676, lng: 6.1046449};
    var coordMarker2 = {lat: 49.1227275, lng: 6.0802297};
    var coordMarker3 = {lat: 10.1227275, lng: 6.0802297};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coordMarker1,
        scrollwheel: false,
        draggable: !is_touch_device()
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var toggleDagControlDiv = document.createElement('div');
    var toggleDagControl = new ToggleDrag(toggleDagControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleDagControlDiv);

    // Mariage civil
    var infowindow1 = new google.maps.InfoWindow({
        content: '' +
        '<div class="note">Mariage civil</div>' +
        '<h4 class="map-title script">Mairie</h4>' +
        '<div class="address">' +
        '<span class="region">59 rue Jeanne d\'Arc</span><br>' +
        '<span class="postal-code">57140</span><br>' +
        '<span class="city-name">Plesnois</span><br>' +
        '</div>'
    });

    // Mariage
    var infowindow2 = new google.maps.InfoWindow({
        content: '' +
        '<div class="note">Cérémonie, vin d\'honneur, diner et brunch</div>' +
        // '<h4 class="map-title script">Salle des mariages, hôtel de ville</h4>' +
        '<div class="address">' +
        '<span class="region">4, rue Jeanne D\'arc</span><br>' +
        '<span class="postal-code">57160</span><br>' +
        '<span class="city-name">Châtel-Saint- Germain</span><br>' +
        '</div>'
    });

    // var infowindow3 = new google.maps.InfoWindow({
    //     content: '' +
    //     '<div class="note">Cérémonie laïque, vin d\'honneur et réception</div>' +
    //     '<div class="">(Brunch le dimanche)</div>' +
    //     '<h4 class="map-title script">Restaurant M</h4>' +
    //     '<div class="address">' +
    //     '<span class="region">7 place du Général de Gaulle</span><br>' +
    //     '<span class="postal-code">57565</span><br>' +
    //     '<span class="city-name">Niderviller</span><br>' +
    //     '</div>'
    // });

    var marker1 = new google.maps.Marker({
        position: coordMarker1,
        map: map,
        title: 'Mariage civil'
    });
    var marker2 = new google.maps.Marker({
        position: coordMarker2,
        map: map,
        title: 'Cérémonie'
    });
    // var marker3 = new google.maps.Marker({
    //     position: coordMarker3,
    //     map: map,
    //     title: 'Cérémonie, vin d\'honneur et dinner'
    // });

    marker1.addListener('click', function() {
        infowindow1.open(map, marker1);
        infowindow2.close();
        // infowindow3.close();
    });
    marker2.addListener('click', function() {
        infowindow1.close();
        // infowindow3.close();
        infowindow2.open(map, marker2);
    });
    // marker3.addListener('click', function() {
    //     infowindow3.open(map, marker3);
    //     infowindow2.close();
    //     infowindow1.close();
    // });

    infowindow1.open(map, marker1);

    // var markers = {
    //     niderviller: {
    //         marker: marker1,
    //         infoWindow: infowindow1
    //     },
    //     strasbourg: {
    //         marker: marker2,
    //         infoWindow: infowindow2
    //     }
    // };

    // This listener allow opening correct marker info on click
    // by specifying [data] value
    // $('[data-target-map-marker]').on('click', function(){
    //     // close all previous info
    //     for(var tmp in markers){
    //         markers[tmp].infowindow.close();
    //     }
    //     // open info for current marker
    //     var marker = markers[$(this).data('targetMapMarker')];
    //     marker.infowindow.open(map, marker.marker);
    // });
}

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

