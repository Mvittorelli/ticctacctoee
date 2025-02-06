document.addEventListener("DOMContentLoaded", function () {
  var options = document.querySelectorAll(".options > *");
  var links = document.querySelectorAll(".startgame a");

  for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (event) {
      var selected = event.target;
      for (var j = 0; j < options.length; j++) {
        options[j].classList.remove("selected");
      }
      selected.classList.add("selected");

      for (var k = 0; k < links.length; k++) {
        var link = links[k];
        var href = link.href;
        var newHref =
          href.substring(0, href.length - 1) +
          (selected.classList.contains("x") ? "x" : "o");
        link.href = newHref;
      }
    });
  }
});
