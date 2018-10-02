// This code (and associated CSS) came from https://www.w3schools.com/howto/howto_js_filter_lists.asp.
// Using internet resources is a useful skill, but this is a lot of copy-paste without changing
// much of anything for your specific use case.
// At minimum, this should have had a citation with that link.
// This is losing you two points. Cite your sources.

// You're also missing use strict, and this is all vanilla while the rest of your site uses jQuery...
// It sticks out massively.

function filterPatients() {
  // Declare variables
  let input, filter, ul, li, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('patient-list');
  li = ul.getElementsByTagName('li');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('span')[1];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

$('#myInput').on('input', filterPatients);



