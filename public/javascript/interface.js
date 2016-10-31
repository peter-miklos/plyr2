"use strict"

$(document).ready(function() {

  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });


  $("tr").not(':first').hover(
    function () {
      $(this).css("background","aqua");
    },
    function () {
      $(this).css("background","");
    }
  );

document.getElementById('event_date').valueAsDate = new Date();

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

})
