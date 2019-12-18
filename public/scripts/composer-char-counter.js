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

$(document).ready(function() {
  $(document).scroll(function() {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 150) {
      $(".fa-chevron-up")[0].style.display = "block";
    } else {
      $(".fa-chevron-up")[0].style.display = "none";
    }
  });

  $(".fa-chevron-up").click(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $("textarea")[0].focus();
  });

  $("#write").click(function() {
    if (document.documentElement.scrollTop < 150) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 160;
      $("textarea")[0].focus();
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      $("textarea")[0].focus();
    }
  });
});
