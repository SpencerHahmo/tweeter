/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  
  const createTweetElement = (tweet) => {
    const $tweet = $(
    `<article class="tweet">
      <header class="tweet-header">
        <div class="user">
          <img class="user-icon" src="${tweet.user.avatars}">
          <h3 class="user-name">${tweet.user.name}</h3>
        </div>
        <div>
          <h3 class="user-handle">${tweet.user.handle}</h3>
        </div>
      </header>
      <div class="tweet-text">${tweet.content.text}</div>
      <footer class="tweet-footer">
        <span class="tweet-date">${timeago.format(tweet.created_at)}</span>
        <div class="tweet-responses">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`)
    return $tweet;
  };

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const newTweet = $(this).serialize();
    $.post("/tweets", newTweet)
  });

  const loadTweets = () => {
    $.get("/tweets", function(newTweet) {
      renderTweets(newTweet);
    });
  };

  loadTweets();
});