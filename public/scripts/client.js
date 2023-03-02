/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  
  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
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

  $("#tweet-form").submit((event) => {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log("IT WORKED");
    console.log(tweet);
    $.post("/tweets", tweet)
  });

  renderTweets(data);
});