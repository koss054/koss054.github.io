// Player stats.
class Player {
  constructor() {
    this.minNumber = 1;
    this.maxNumber = 5;

    this.currentScore = Math.ceil(this.maxNumber / 2);
    this.totalScore = 0.000001;

    // TODO: Make secret number private to it can't be taken from the dev console.
    // Easy fix but rn I'm too lazy to update it ;D
    this.secretNumber =
      Math.floor(Math.random() * this.maxNumber) + this.minNumber;
    this.isGuessed = false;
  }

  resetScore() {
    this.currentScore = Math.ceil(this.maxNumber / 2);
  }

  setSecretNumber() {
    this.secretNumber =
      Math.floor(Math.random() * this.maxNumber) + this.minNumber;
  }
}

// Functions used in page functions.
class Page {
  // Private methods.
  #setBetweenRange(minNumber, maxNumber) {
    document.getElementById(
      "between"
    ).innerHTML = `(Between ${minNumber} and ${maxNumber})`;
  }

  #setScore(currentScore) {
    document.getElementById("score").innerHTML = `${currentScore}`;
  }

  #setTotalScore(totalScore) {
    document.getElementById("total-score").innerHTML = `${totalScore.toFixed(
      1
    )}`;
  }

  #setShortcutNumbers(minNumber, maxNumber) {
    document.getElementById("min-number").innerHTML = `${minNumber}`;
    document.getElementById("max-number").innerHTML = `${maxNumber}`;
    document.getElementById("mid-number").innerHTML = `${Math.ceil(
      maxNumber / 2
    )}`;
  }

  // Public methods.
  setValuesOnPage(player) {
    this.#setBetweenRange(player.minNumber, player.maxNumber);
    this.#setScore(player.currentScore);
    this.#setTotalScore(player.totalScore);
    this.#setShortcutNumbers(player.minNumber, player.maxNumber);
  }

  resetScreen(player) {
    player.isGuessed = false;
    document.querySelector("body").style.background = "#222";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".btn.again").style.display = "none";
    document.querySelector(".btn.check").style.display = "inline-block";
    document.querySelector(".number").innerHTML = "?";
    document.querySelector("#message").innerHTML = "Start guessing...";
  }

  guessedNumber(secretNumber) {
    document.querySelector("body").style.background = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".btn.check").style.display = "none";
    document.querySelector(".btn.again").style.display = "inline-block";
    document.querySelector(".number").innerHTML = `${secretNumber}`;
  }

  updateOnClick(player, playerGuess, guessMessageElement) {
    console.log(player);
    if (playerGuess == player.secretNumber) {
      this.guessedNumber(player.secretNumber);
      guessMessageElement.innerHTML =
        "✅ You guessed the number! Changing number...";
      player.totalScore += player.currentScore;
      player.setSecretNumber();
      player.isGuessed = true;
    } else if (playerGuess > player.secretNumber) {
      guessMessageElement.innerHTML = "☝ Too high...";
      player.currentScore--;
    } else if (playerGuess < player.secretNumber) {
      guessMessageElement.innerHTML = "👇 Too low...";
      player.currentScore--;
    }
  }

  outOfScore() {
    document.querySelector("body").style.background = "#ab263a";
    document.querySelector(".btn.check").style.display = "none";
    document.querySelector(".btn.again").style.display = "inline-block";
    document.querySelector(".number").innerHTML = "X";
  }
}

// Button events function.
const buttonEvents = function (player, page) {
  // Button elements.
  const btnAgain = document.querySelector(".btn.again");
  const btnCheck = document.querySelector(".btn.check");
  const btnUpgrade = document.querySelector(".btn.upgrade");

  // Button events.
  btnAgain.addEventListener("click", function () {
    againClicked(player, page);
  });

  btnCheck.addEventListener("click", function () {
    checkClicked(player, page);
  });

  btnUpgrade.addEventListener("click", function () {
    toggleUpgradeTab(player);
  });

  // Inner functions for buttons.
  function againClicked(player, page) {
    player.currentScore = Math.ceil(player.maxNumber / 2);
    page.resetScreen(player, page);
  }

  function checkClicked(player, page) {
    const userGuess = document.getElementById("guess").value;
    const guessMessage = document.getElementById("message");

    if (!userGuess) {
      guessMessage.innerHTML = `⛔ Type a number between ${player.minNumber} and ${player.maxNumber}...`;
    } else {
      page.updateOnClick(player, userGuess, guessMessage);

      if (player.currentScore == 0) {
        page.outOfScore();
        guessMessage.innerHTML =
          "⛔ You didn't guess! Changing secret number...";
        player.setSecretNumber();
      }
    }
  }
};

// Upgrade tab function.
const upgradeTabEvents = function (player) {
  const upgradeOverlay = document.querySelector(".overlay");
  const closeUpgradeTab = document.querySelector(".close-upgrade");

  upgradeOverlay.addEventListener("click", function () {
    toggleUpgradeTab(player);
  });

  closeUpgradeTab.addEventListener("click", function () {
    toggleUpgradeTab(player);
  });
};

// Global functions.
function toggleUpgradeTab(player) {
  document.querySelector(".upgrade-tab").classList.toggle("hidden");
  document.querySelector(".overlay").classList.toggle("hidden");
  updateUpgradeTabCurrency(player);
}

function updateUpgradeTabCurrency(player) {
  document.querySelector(".currency").innerHTML = `${player.totalScore.toFixed(
    1
  )}`;
}

// Initializing classes.
const player = new Player();
const page = new Page();

// Page functions.
buttonEvents(player, page);
upgradeTabEvents(player);

// Interval function(s).
setInterval(function () {
  page.setValuesOnPage(player);
}, 100);
