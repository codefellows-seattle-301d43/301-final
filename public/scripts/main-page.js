$(function() {
  $('.input').mousedown(() => {
    $('#myInput').addClass('animated fadeOutRight');
    $('.floatedOr').hide();
    $('main.site-content').addClass('centered-form');
    $('.form-container').addClass('animated fadeInLeft');
  });

  $('#myInput').mousedown(() => {
    $('#myInput').removeClass('animated fadeOutRight');
    $('.floatedOr').hide();
    $('.form-container').hide();
    $('#patient-list').show(500).addClass('animated fadeInRight');
    $('#myInput').addClass('search-width');
    $('under-form').show(500).addClass('animated fadeInRight');
  });
});