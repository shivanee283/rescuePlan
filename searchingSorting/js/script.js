$(document).ready(function() {
    // Sorting and Searching Integer Array
    $('#sortIntArray').click(function() {
      let intArray = $('#intArray').val().split(',').map(Number);
      intArray.sort((a, b) => a - b);
      $('#intArrayResult').html('Sorted Array: ' + intArray.join(', ')).show();
    });
  
    $('#searchIntArray').click(function() {
      let intArray = $('#intArray').val().split(',').map(Number);
      let searchValue = parseInt($('#intSearchValue').val());
      let index = intArray.indexOf(searchValue);
      if (index !== -1) {
        $('#intArrayResult').html('Value found at index: ' + index).show();
      } else {
        $('#intArrayResult').html('Value not found').show();
      }
    });
  
    // Sorting and Searching Named Entities Array
    $('#sortNameArray').click(function() {
      let nameArray = $('#nameArray').val().split(',').map(name => name.trim());
      nameArray.sort();
      $('#nameArrayResult').html('Sorted Array: ' + nameArray.join(', ')).show();
    });
  
    $('#searchNameArray').click(function() {
      let nameArray = $('#nameArray').val().split(',').map(name => name.trim());
      let searchValue = $('#nameSearchValue').val().trim();
      let index = nameArray.indexOf(searchValue);
      if (index !== -1) {
        $('#nameArrayResult').html('Value found at index: ' + index).show();
      } else {
        $('#nameArrayResult').html('Value not found').show();
      }
    });
  });