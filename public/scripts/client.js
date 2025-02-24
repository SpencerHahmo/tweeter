/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // Hides the error messages on the intial load
  $("#empty-message").hide();
  $("#too-long-message").hide();

  // Function that re-encodes text so that unsafe characters are converted into a safe "encoded" representation
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Renders the tweet data by prepending all of the tweets into the #tweets-container form
  const renderTweets = (tweets) => {
    // Empties tweets-container to avoid duplicates appearing
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };
  
  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="user">
          <img class="users-icon" src="${escape(tweet.user.avatars)}">
          <h3 class="users-name">${escape(tweet.user.name)}</h3>
        </div>
        <div>
          <h3 class="users-handle">${escape(tweet.user.handle)}</h3>
        </div>
      </header>
      <div class="tweet-text">${escape(tweet.content.text)}</div>
      <footer class="tweet-footer">
        <span class="tweet-date">${escape(timeago.format(tweet.created_at))}</span>
        <div class="tweet-responses">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  };

  // Adds a new tweet when clickig submit
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const charLimit = 140;
    const inputLength = $(this).find("#tweet-text").val().length;

    // Hides all error message so multiple don't appear at once
    $("#empty-message").hide();
    $("#too-long-message").hide();

    // If the user doesn't enter anything
    if (!inputLength) {
      return $("#empty-message").slideDown("fast");
    }

    // If the user enters more than 140 characters
    if (inputLength > charLimit) {
      return $("#too-long-message").slideDown("fast");
    }
    
    // When you post successfully it resets the textarea and counter to their original values
    const newTweet = $(this).serialize();
    $.post("/tweets", newTweet, () => {
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val(charLimit);
      loadTweets();
    });
  });

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET", dataType: "JSON", success: (tweets) => {
      renderTweets(tweets);
    }});
  };

  loadTweets();
});