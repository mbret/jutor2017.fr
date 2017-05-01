/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: FR (French; français)
 */
$.extend( $.validator.messages, {
    required: "Ce champ est obligatoire.",
    remote: "Veuillez corriger ce champ.",
    email: "Veuillez fournir une adresse électronique valide.",
    url: "Veuillez fournir une adresse URL valide.",
    date: "Veuillez fournir une date valide.",
    dateISO: "Veuillez fournir une date valide (ISO).",
    number: "Veuillez fournir un numéro valide.",
    digits: "Veuillez fournir seulement des chiffres.",
    creditcard: "Veuillez fournir un numéro de carte de crédit valide.",
    equalTo: "Veuillez fournir encore la même valeur.",
    extension: "Veuillez fournir une valeur avec une extension valide.",
    maxlength: $.validator.format( "Veuillez fournir au plus {0} caractères." ),
    minlength: $.validator.format( "Veuillez fournir au moins {0} caractères." ),
    rangelength: $.validator.format( "Veuillez fournir une valeur qui contient entre {0} et {1} caractères." ),
    range: $.validator.format( "Veuillez fournir une valeur entre {0} et {1}." ),
    max: $.validator.format( "Veuillez fournir une valeur inférieure ou égale à {0}." ),
    min: $.validator.format( "Veuillez fournir une valeur supérieure ou égale à {0}." ),
    step: $.validator.format( "Veuillez fournir une valeur multiple de {0}." ),
    maxWords: $.validator.format( "Veuillez fournir au plus {0} mots." ),
    minWords: $.validator.format( "Veuillez fournir au moins {0} mots." ),
    rangeWords: $.validator.format( "Veuillez fournir entre {0} et {1} mots." ),
    letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
    alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",
    lettersonly: "Veuillez fournir seulement des lettres.",
    nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
    ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
    integer: "Veuillez fournir un nombre non décimal qui est positif ou négatif.",
    vinUS: "Veuillez fournir un numéro d'identification du véhicule (VIN).",
    dateITA: "Veuillez fournir une date valide.",
    time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
    phoneUS: "Veuillez fournir un numéro de téléphone valide.",
    phoneUK: "Veuillez fournir un numéro de téléphone valide.",
    mobileUK: "Veuillez fournir un numéro de téléphone mobile valide.",
    strippedminlength: $.validator.format( "Veuillez fournir au moins {0} caractères." ),
    email2: "Veuillez fournir une adresse électronique valide.",
    url2: "Veuillez fournir une adresse URL valide.",
    creditcardtypes: "Veuillez fournir un numéro de carte de crédit valide.",
    ipv4: "Veuillez fournir une adresse IP v4 valide.",
    ipv6: "Veuillez fournir une adresse IP v6 valide.",
    require_from_group: "Veuillez fournir au moins {0} de ces champs.",
    nifES: "Veuillez fournir un numéro NIF valide.",
    nieES: "Veuillez fournir un numéro NIE valide.",
    cifES: "Veuillez fournir un numéro CIF valide.",
    postalCodeCA: "Veuillez fournir un code postal valide."
} );

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
        },
        present: {
            // required: true
        },
        alone: {
            required: true
        }
    }
});

$('#rsvp-form-submit').on('click',function(){
  if($("#rsvpForm").valid()) {
    var name = $("input#guestName").val();
    var conjointName = $("input#conjointName").val();
    // var email = $("input#guestEmail").val();
    var message = $("textarea#guestMessage").val();
    var songs = $("textarea#songs").val();
    var present = $("input#present").prop("checked");
    var carpooling = $("input#carpooling").val();
    var alone = $("input[name=alone]:checked").val();
    var helpCar = $("input[name=helpCar]:checked").val();
    var data = {
        guestName: name,
        present: present,
        // email: email,
        message: message,
        alone: alone,
        songs: songs,
        helpCar: helpCar,
        carpooling: carpooling,
        conjointName: conjointName
    };

    console.log("data", data);

    $.ajax({
      url: window.APP_CONFIG.apiHost + "/mail",
      type: "POST",
      data: data,
        error: function(err) {
            console.error(err.responseJSON);
            onError();
        },
      success: function(response, textStatus){
        console.log("ok", response, textStatus);
        if(textStatus === "success")
        {
          $('#submitMessage').html("<div class='alert alert-success'>");
          $('#submitMessage > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#submitMessage > .alert-success')
            .append("<strong>Le message a été correctement envoyé.</strong>");
          $('#submitMessage > .alert-success')
            .append('</div>');
          $('#submitMessage').delay(5000).fadeOut();
          // clear all fields
          $('#rsvpForm').trigger("reset");
        }
        else{
          onError();
        }
      }
    });

    function onError() {
        $('#submitMessage').html("<div class='alert alert-danger'>");
        $('#submitMessage > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#submitMessage > .alert-danger').append("<strong>Désolé une erreur est survenue, veuillez réessayer.</strong>");
        $('#submitMessage > .alert-danger').append('</div>');
        $('#submitMessage').delay(3000).fadeOut();
        //clear all fields
        $('#rsvpForm').trigger("reset");
    }
  }
});

