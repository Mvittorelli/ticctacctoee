document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var buttons = document.querySelectorAll(".grid button");
  var hoverstyle = document.querySelector(".hoverstyle");
  var restartButton = document.querySelector(".restart");
  var quitButtons = document.querySelectorAll(".quit");
  var nextRoundButtons = document.querySelectorAll(".nextround");
  var boardX = 0;
  var boardO = 0;
  var isTurnO = params.get("start") === "o";
  var isCPU = params.get("vs") === "cpu";
  var winningPatterns = [448, 56, 7, 292, 146, 73, 273, 84];

  function updateHoverEffect() {
    hoverstyle.innerHTML =
      ".grid > button:not(.clicked):hover { background: no-repeat center url('assets/select" +
      (isTurnO ? "o" : "x") +
      ".svg'); background-size: 32px 32px; }";
  }

  function resetBoard() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = "";
      buttons[i].className = "";
    }
    boardX = 0;
    boardO = 0;
    document.querySelector(".owon").style.display = "none";
    document.querySelector(".xwon").style.display = "none";
    document.querySelector(".tie").style.display = "none";
    updateHoverEffect();
  }

  restartButton.addEventListener("click", resetBoard);
  for (var i = 0; i < nextRoundButtons.length; i++) {
    nextRoundButtons[i].addEventListener("click", resetBoard);
  }
  for (var i = 0; i < quitButtons.length; i++) {
    quitButtons[i].addEventListener("click", function () {
      window.location.href = "./index.html";
    });
  }

  function checkWin(board, className) {
    for (var i = 0; i < winningPatterns.length; i++) {
      if ((winningPatterns[i] & board) === winningPatterns[i]) {
        document.querySelector(className).style.display = "flex";
        return true;
      }
    }
    return false;
  }

  function cpuMove() {
    var availableButtons = [];
    for (var i = 0; i < buttons.length; i++) {
      if (!buttons[i].classList.contains("clicked")) {
        availableButtons.push(buttons[i]);
      }
    }
    if (availableButtons.length > 0) {
      var move =
        availableButtons[Math.floor(Math.random() * availableButtons.length)];
      move.click();
    }
  }

  for (var i = 0; i < buttons.length; i++) {
    (function (index) {
      buttons[index].addEventListener("click", function () {
        if (buttons[index].innerHTML === "") {
          buttons[index].innerHTML = isTurnO ? "O" : "X";
          buttons[index].classList.add("clicked");
          if (isTurnO) {
            boardO |= 1 << index;
          } else {
            boardX |= 1 << index;
          }
          if (checkWin(boardO, ".owon") || checkWin(boardX, ".xwon")) {
            return;
          }
          var emptyCells = false;
          for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].innerHTML === "") {
              emptyCells = true;
              break;
            }
          }
          if (!emptyCells) {
            document.querySelector(".tie").style.display = "flex";
            return;
          }
          isTurnO = !isTurnO;
          updateHoverEffect();
          if (isCPU && !isTurnO) {
            setTimeout(cpuMove, 500);
          }
        }
      });
    })(i);
  }

  updateHoverEffect();
});
