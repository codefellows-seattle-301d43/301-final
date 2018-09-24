'use strict';

$(document).ready(() => {
  $('.menu-toggle').click(() => {
    $('nav').toggleClass('active');
  });

  $('ul li').click(function(){
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });
});
