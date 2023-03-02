$(document).ready(() => {
  $("#tweet-text").on("input", function() {
    const charLimit = 140;
    const userInputLength = $(this).val().length;
    const count = charLimit - userInputLength;
    
    // Gets the direct path to the counter element
    const $counter = $(this).parent().children().children(".counter");
    $counter.text(count);

    // If the user has entered more than 140 characters adds a class which makes the text red
    if (count < 0) {
      $counter.addClass("invalid");
    } else {
      $counter.removeClass("invalid");
    }
  });
});