'use strict';

$(document).ready(() => {
  $('.menu-toggle').click(() => {
    $('nav').toggleClass('active');
    $('.social').toggleClass('show');
  });

  $('ul li').click(function(){
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });
});
