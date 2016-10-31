"use strict"

$(document).ready(function() {

  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });

  if(document.location.href.indexOf("/events/new") != -1) {
    function initialize() {
      var input = document.getElementById('searchTextField');
      var autocomplete = new google.maps.places.Autocomplete(input);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
  }

})
