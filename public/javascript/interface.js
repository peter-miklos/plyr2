"use strict"

$(document).ready(function() {

  if (document.getElementById("searchInput")) {
    filterEventDate();
  }

  if (document.getElementById("map")) {
    getEventLocations();
  }

  if (document.getElementById("searchTextField")) {
    calculateCoordinates();
  }

  if (document.getElementById("event_date")) {
    setEventDate();
  }


  if (document.getElementById("weather")) {
    displayWeather();
  }


  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });

  function filterEventDate() {
    $("#searchInput").keyup(function () {
        //split the current value of searchInput
        var data = this.value.toUpperCase().split(" ");
        //create a jquery object of the rows
        var jo = $("#fbody").find("tr");
        if (this.value == "") {
            jo.show();
            return;
        }
        //hide all the rows
        jo.hide();

        //Recusively filter the jquery object to get results.
        jo.filter(function (i, v) {
            var $t = $(this);
            for (var d = 0; d < data.length; ++d) {
                if ($t.text().toUpperCase().indexOf(data[d]) > -1) {
                    return true;
                }
            }
            return false;
        })
        //show the rows that match.
        .show();
    }).focus(function () {
        this.value = "";
        $(this).css({
            "color": "black"
        });
        $(this).unbind('focus');
    }).css({
        "color": "#C0C0C0"
    });
  }

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

  function setEventDate() {
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
          'value': h + 1 + ':' + m
        });
      });
    });
  }

  function getEventLocations() {
    $.get("/events/getEventLocations", function(data) {
      addMapToStartPage(data);
    })
  }

  function addMapToStartPage(locations) {
    var dayControlDiv = document.createElement('div');
    var dayControl = new DayControl(dayControlDiv, map);
    // var allDateControlDiv = document.createElement('div');
    // var allDateControl = new AllDateControl(allDateControlDiv, map);
    dayControlDiv.index = 1;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        });


        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(dayControlDiv);
        putPinsOnMap(locations, map);
      });
    } else {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(51.5074, .1278)
      });
      putPinsOnMap(locations, map);
    }
  }

  function putPinsOnMap(locations, map) {
    var marker, i;
    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][0], locations[i][1]),
        icon: locations[i][2],
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][4]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  function DayControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = "Click to show today's events";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = "Today's events";
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
      // map.setCenter({lat: 41.85, lng: -87.65});
      $.get("/events/getEventLocations", function(data) {
        // should check only the dates
        var date = new Date()
        var dayData = data.filter(function(e) { return e[5] === date.setHours(0,0,0,0,0) })
        console.log(dayData)
        addMapToStartPage(dayData);
      })
    });

  }

  function displayWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var apiKey = "&apikey=1235658b8e5f2613a1e72f249e6efe3a";
    var units = '&units=metric';
    var city = document.getElementById("location").innerText;
    $.get(url + city + apiKey + units, function(data) {
      var icon = data.weather[0].icon
      var temp = Math.round(data.main.temp)
      $('#weather').html(' ' + temp +' ºC');
      $('#weather').prepend($('<img>',{id:'theImg',src:'http://openweathermap.org/img/w/'+ icon + '.png'}));
    });
  }
});
