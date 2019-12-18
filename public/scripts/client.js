/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//on pageload
$(() => loadTweets());
//safe html
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//get time function
const time = function(time) {
  const now = new Date(Date.now());
  const past = new Date(time);
  const mins = (now.getTime() - past.getTime()) / (60 * 1000);
  const hours = (now.getTime() - past.getTime()) / (60 * 60 * 1000);
  const days = (now.getTime() - past.getTime()) / (24 * 60 * 60 * 1000);
  let result = "";
  if (days > 1) {
    return (result += `${Math.floor(days)} Day`);
  }
  if (hours > 1) {
    return (result += `${Math.floor(hours)} Hour`);
  }
  if (mins > 1) {
    return (result += `${Math.floor(mins)} Min`);
  }
  if (mins < 1) {
    return "Now";
  }
};
//make the html/tweet template function
const createTweetElement = function(tweetObj) {
  const safeContent = `<p class="ctx">${escape(tweetObj.content.text)}</p>`;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const timeStamp = new Date(tweetObj.created_at);
  return `<article class="tweet">
    <header class="tweet-header">
      <person>
      <img src= ${tweetObj.user.avatars}/> ${tweetObj.user.name}
      </person>
      <handle class="hover-content">${tweetObj.user.handle}</handle>
    </header>
    ${safeContent}
    <footer class="tweet-footer">
      <timestamp class="no-hover-content">${timeStamp.toLocaleDateString(
        "en-US",
        options
      )}</timestamp>
      <since class="hover-content">${time(tweetObj.created_at)}</since>
      <socials class="hover-content">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </socials>
    </footer>
  </article>`;
};
//render singular tweet
const renderTweet = function(tweet) {
  $("#tweets").prepend(createTweetElement(tweet));
};
//render all the tweets
const renderTweets = function(objArr) {
  $("#tweets").empty();
  for (let el of objArr) {
    renderTweet(el);
  }
};
//load singular tweet
const loadTweet = function() {
  $.ajax("/tweets", { method: "GET" }).then(function(res) {
    renderTweet(res[$("#tweets").children().length]);
  });
};
//load all the tweets
const loadTweets = function() {
  $.ajax("/tweets", { method: "GET" }).then(function(res) {
    renderTweets(res);
  });
};
//submit actions
$("form").submit(function(event) {
  event.preventDefault();
  //in case of error
  if ($("#inputTweet").val() === "" || $("#inputTweet").val() === null) {
    $("#error").text("You've entered an empty value");
    setTimeout(function() {
      $("#error").text("");
    }, 2500);
    return;
  }
  //in case of error
  if ($("#inputTweet").val().length > 140) {
    $("#error").text("You've exceeded the limit");
    setTimeout(function() {
      $("#error").text("");
    }, 2500);
    return;
  }
  //post
  $.ajax("/tweets", { method: "POST", data: $(this).serialize() }).then(
    function(res) {
      loadTweet();
    }
  );
  //empty the textarea
  $("#inputTweet").val("");
});
