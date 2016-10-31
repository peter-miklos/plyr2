"use strict"

$(document).ready(function() {

  if(document.location.href.indexOf("/events/index") != -1) {
    $("tr.clickable-row").find("a").click(function() {

      showHideEvent(this);
      return false;
    });
    $(".clickable-row").click(function() {
      showHideEvent($(this).find("a"));
    });
  }

  function showEvent(aTag) {
    var pageUrl = $(aTag).attr("href");
    var parentTr = $(aTag).parent().parent();

    $.get( pageUrl, function( data ) {
      parentTr.after('<tr><td>&nbsp;</td><td colspan="5"><table class="eventDetail">' + $(data).find(".table").html() + '</table></td></tr>');
      $(aTag).attr('class', 'expanded');
    });
  }

  function showHideEvent(aTag) {
    if ($(aTag).attr('class') == 'expanded') {
      $(aTag).parent().parent().next().hide();
      $(aTag).attr('class', 'collapsed');
    }
    else if ($(aTag).attr('class') == 'collapsed') {
//this can be moved to own function
      $(".expanded").each(function() {
        $(this).parent().parent().next().hide();
        $(this).attr('class', 'collapsed');
      });

      $(".expanded").hide();
      $(aTag).parent().parent().next().show();
      $(aTag).attr('class', 'expanded');
    }
    else
    { //this can be moved to own function
      $(".expanded").each(function() {
        $(this).parent().parent().next().hide();
        $(this).attr('class', 'collapsed');
        });
      showEvent(aTag);
    }
  }



  $("tr").not(':first').hover(
    function () {
      $(this).css("background","aqua");
    },
    function () {
      $(this).css("background","");
    }
  );

})
