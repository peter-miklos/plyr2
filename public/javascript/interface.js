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

  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;


 $('#event_date').val(today);

var today = new Date().toISOString().split('T')[0];

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

})
