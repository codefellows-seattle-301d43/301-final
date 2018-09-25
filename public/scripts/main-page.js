$(function() {
  $('.input').mousedown(() => {
    $('#myInput').hide();
    $('.floatedOr').hide();
    $('main.site-content').addClass('centered-form');
  });

  $('#myInput').mousedown(() => {
    $('.floatedOr').hide();
    $('.form-container').hide();
    $('#patient-list').show();
    $('#myInput').addClass('search-width');
    $('#myInput').show();
  });
});