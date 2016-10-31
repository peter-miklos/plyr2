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

var now = new Date();

 var day = ("0" + now.getDate()).slice(-2);
 var month = ("0" + (now.getMonth() + 1)).slice(-2);

 var today = now.getFullYear()+"-"+(month)+"-"+(day) ;


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

});
