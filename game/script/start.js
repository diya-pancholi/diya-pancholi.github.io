document.addEventListener("DOMContentLoaded", () => {
  const timedisplay = document.querySelector("#time_left");

  let timeLeft = 30;

  function countDown() {
    setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval((timeLeft = 0));
      }
      if (timeLeft == 0) {
        var gameover = window.prompt(
          "Your score is: " +
            score +
            " . Type 'gameover' and doublepress enter to continue "
        );
      }

      if (gameover == "gameover") {
        window.location.replace("../html/index.html");
      }
      timedisplay.innerHTML = timeLeft;
      timeLeft--;
    }, 1000);
  }
  countDown();
});
