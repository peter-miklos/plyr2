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
  else {
    $(".clickable-row").click(function() {
      window.document.location = $(this).data("href");
    });
  }

  function showEvent(aTag) {
    var pageUrl = $(aTag).attr("href");
    var parentTr = $(aTag).parent().parent();
    //parentTr.after('<tr><td colspan="6">Loading....</td></tr>');

    $.get( pageUrl, function( data ) {
      parentTr.after('<tr><td colspan="6"><table>' + $(data).find(".table").html() + '</table></td></tr>');
      $(aTag).attr('class', 'expanded');
    });
  }

  function showHideEvent(aTag) {
    if ($(aTag).attr('class') == 'expanded') {
      $(aTag).parent().parent().next().hide();
      $(aTag).attr('class', 'collapsed');
    }
    else if ($(aTag).attr('class') == 'collapsed') {
      $(aTag).parent().parent().next().show();
      $(aTag).attr('class', 'expanded');
    }
    else
    {
      showEvent(aTag);
    }
  }

})
