'use strict';

$(document).ready(() => {
  $('.menu-toggle-one').click(() => {
    $('nav').toggleClass('active');
    $('.social').toggleClass('show');
    $('.menu-toggle-one').hide();
    $('.menu-toggle-two').show();
  });

  $('.menu-toggle-two').click(() => {
    $('nav').toggleClass('active');
    $('.social').toggleClass('show');
    $('.menu-toggle-two').hide();
    $('.menu-toggle-one').show();
  });

  $('ul li').click(function(){
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });
});

