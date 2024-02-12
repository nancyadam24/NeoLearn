$(document).ready(function(){
  $('#searcher').keyup(function(){
    var subject = $('#searcher').val().trim(); 
    if (subject === '') { 
      $('#resultsList').html(''); 
    } else {
      $('#resultsList').html(''); 
      var expression = new RegExp(subject, "i");
      var noResults = true;

      // Επιλέξτε τα κατάλληλα κομμάτια του DOM που περιέχουν τα μαθήματα
      $('.boxItems').each(function() {
        var title = $(this).find('h4').text();
        var instructor = $(this).find('.blockquote-footer').text();

        if (title.search(expression) !== -1 || instructor.search(expression) !== -1) {
          $('#resultsList').append($(this).clone());
          noResults = false;
        }
      });

      if (noResults) {
        $('#resultsList').html('<p>No results found</p>');
      }
    }
  });
});
