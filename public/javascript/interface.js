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

})
