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

function myFunction() {
  // Declare variables
  let input, filter, ul, li, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('patient-list');
  li = ul.getElementsByTagName('li');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('span')[1];
    console.log('a', a);
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}