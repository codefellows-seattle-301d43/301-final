// missing 'use strict';
$('#delete').on('submit', () => {
  return confirm('Are you sure you want to remove this patient?');
});

$('#deleteRec').on('submit', () => {
  return confirm('Are you sure you want to remove this record?');
});