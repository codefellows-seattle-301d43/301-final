'use strict';

// Allow user to return to previous page
$('button#back').on('click', function(e){
  e.preventDefault();
  history.go(-1);
});