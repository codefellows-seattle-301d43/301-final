$(function() {
  $('.input').mousedown(() => {
    $('.grab-span').addClass('floated-title');
    $('#myInput').addClass('animated fadeOutRight');
    $('.floatedOr').hide();
    $('main.site-content').addClass('centered-form');
    $('.form-container').addClass('animated fadeInLeft');
    $('.floated-title').hide();
  });

  $('#myInput').mousedown(() => {
    $('.grab-span').removeClass('floated-title');
    $('.grab-span').show().addClass('center-existing');
    $('#myInput').removeClass('animated fadeOutRight');
    $('.floatedOr').hide();
    $('.form-container').hide();
    $('#patient-list').show(500).addClass('animated fadeInRight');
    $('#myInput').addClass('search-width');
    $('under-form').show(500).addClass('animated fadeInRight');
  });
});