$(document).ready(function() {
  $("#tweet-text").on("input", function () {
    const charLimit = 140;
    const userInputLength = $(this).val().length;
    const count = charLimit - userInputLength;
    
    // Gets the direct path to the element that has counter as a class
    const $counter = $(this).parent().children().children(".counter");

    // Changes the text to count
    $counter.text(count);

    // If the user has entered more than 140 characters
    if (count < 0) {
      $counter.addClass("invalid");
    } else {
      $counter.removeClass("invalid");
    }
  });
});