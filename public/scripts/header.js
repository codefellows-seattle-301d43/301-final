'use strict';

$(document).ready(() => {
  $('.menu-toggle-one').click(() => {
    $('nav').toggleClass('active');
    $('.social').toggleClass('show');
    $('.menu-toggle-one').hide();
    $('.menu-toggle-two').show();
    $('#search-patient').hide();
  });

  $('.menu-toggle-two').click(() => {
    $('nav').toggleClass('active');
    $('.social').toggleClass('show');
    $('.menu-toggle-two').hide();
    $('.menu-toggle-one').show();
    $('#search-patient').show();
  });

});

