"use strict"

$(document).ready(function() {

  addMapToStartPage();
  calculateCoordinates();

  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });

  function calculateCoordinates() {
    if(document.location.href.indexOf("/events/new") != -1) {
      function initialize() {
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              document.getElementById('cityLat').value = place.geometry.location.lat();
              document.getElementById('cityLng').value = place.geometry.location.lng();
             });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }
  }

  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear()+"-"+(month)+"-"+(day);

  $('#event_date').val(today);
  $('#event_date').attr({'min': today});

  $(function(){
    $("#event_time").each(function(){
      var d = new Date(),
          h = d.getHours(),
          m = d.getMinutes();
      if(h < 10) h = '0' + h;
      if(m < 10) m = '0' + m;
      $(this).attr({
        'value': h + 1 + ':' + m,
        'min': h + 1 + ':' + m
      });
    });
  });

  function addMapToStartPage() {
    var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4, "/events/index"],
      ['Coogee Beach', -33.923036, 151.259052, 5, "/events/index"],
      ['Cronulla Beach', -34.028249, 151.157507, 3, "/events/index"],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2,"/events/index"],
      ['Maroubra Beach', -33.950198, 151.259302, 1, "/events/index"]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("Test name22" + "<br><a href='" + locations[i][4] + "'>Link</a>");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

});
