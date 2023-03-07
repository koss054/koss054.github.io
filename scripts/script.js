// Player stats.
class Player {
  constructor() {
    this.minNumber = 1;
    this.maxNumber = 5;

    this.currentScore = Math.ceil(this.maxNumber / 2);
    this.totalScore = 0.000001;

    this.secretNumber =
      Math.floor(Math.random() * this.maxNumber) + this.minNumber;
    this.isGuessed = false;
  }

  resetScore() {
    this.currentScore = Math.ceil(this.maxNumber / 2);
  }
}

// Functions used in page functions.
function setValuesOnPage(player) {
  setBetweenRange(player.minNumber, player.maxNumber);
  setScore(player.currentScore);
  setTotalScore(player.totalScore);
}

function setBetweenRange(minNumber, maxNumber) {
  document.getElementById(
    "between"
  ).innerHTML = `(Between ${minNumber} and ${maxNumber})`;
}

function setScore(currentScore) {
  document.getElementById("score").innerHTML = `${currentScore}`;
}

function setTotalScore(totalScore) {
  document.getElementById("total-score").innerHTML = `${totalScore.toFixed(1)}`;
}

function setSecretNumber(player) {
  return Math.floor(Math.random() * player.maxNumber) + player.minNumber;
}

function resetScreen(player) {
  player.isGuessed = false;
  document.querySelector("body").style.background = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".btn.again").style.display = "none";
  document.querySelector(".btn.check").style.display = "inline-block";
  document.querySelector(".number").innerHTML = "?";
  document.querySelector("#message").innerHTML = "Start guessing...";
}

function updateOnClick(player, playerGuess, guessMessageElement) {
  console.log(player);
  if (playerGuess == player.secretNumber) {
    guessedNumber(player.secretNumber);
    guessMessageElement.innerHTML =
      "✅ You guessed the number! Changing number...";
    player.totalScore += player.currentScore;
    player.secretNumber = setSecretNumber(player);
    player.isGuessed = true;
  } else if (playerGuess > player.secretNumber) {
    guessMessageElement.innerHTML = "☝ Too high...";
    player.currentScore--;
  } else if (playerGuess < player.secretNumber) {
    guessMessageElement.innerHTML = "👇 Too low...";
    player.currentScore--;
  }
}

function guessedNumber(secretNumber) {
  document.querySelector("body").style.background = "#60b347";
  document.querySelector(".number").style.width = "30rem";
  document.querySelector(".btn.check").style.display = "none";
  document.querySelector(".btn.again").style.display = "inline-block";
  document.querySelector(".number").innerHTML = `${secretNumber}`;
}

function outOfScore() {
  document.querySelector("body").style.background = "#ab263a";
  document.querySelector(".btn.check").style.display = "none";
  document.querySelector(".btn.again").style.display = "inline-block";
  document.querySelector(".number").innerHTML = "X";
}

// Page functions.
const initialPageState = function (player) {
  // Function that sets all initial values.
  setValuesOnPage(player);
};

const buttonEvents = function (player) {
  // Button elements.
  const btnAgain = document.querySelector(".btn.again");
  const btnCheck = document.querySelector(".btn.check");

  // Button events.
  btnAgain.addEventListener("click", function () {
    againClicked(player);
  });

  btnCheck.addEventListener("click", function () {
    checkClicked(player);
  });

  // Inner functions for buttons.
  function againClicked(player) {
    player.currentScore = Math.ceil(player.maxNumber / 2);
    resetScreen(player);
  }

  function checkClicked(player) {
    const userGuess = document.getElementById("guess").value;
    const guessMessage = document.getElementById("message");

    if (!userGuess) {
      guessMessage.innerHTML = `⛔ Type a number between ${player.minNumber} and ${player.maxNumber}...`;
    } else {
      updateOnClick(player, userGuess, guessMessage);

      if (player.currentScore == 0) {
        outOfScore();
        guessMessage.text("⛔ Try again! Changing number...");
        player.secretNumber = setSecretNumber(player);
      }
    }
  }
};

// Executing functions on the page.
const player = new Player();

initialPageState(player);
buttonEvents(player);

// Interval functions.
setInterval(function () {
  setValuesOnPage(player);
}, 100);
