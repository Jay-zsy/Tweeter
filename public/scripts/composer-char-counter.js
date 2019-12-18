$(document).ready(function() {
  $("#inputTweet").on("input", function() {
    $(".counter")[0].innerHTML = 140 - this.value.length;
    if (this.value.length >= 140) {
      $(".counter")[0].style.color = "#FF1919";
    }
    if (this.value.length < 140) {
      $(".counter")[0].style.color = "#545149";
    }
  });
});
