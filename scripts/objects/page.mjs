// Temporary solution.
const root = document.querySelector(":root");
const rootStyle = getComputedStyle(root);

// Set root var value:
// root.style.setProperty("--failed-background-color", "purple");

// Page object.
export class Page {
  constructor(cookies) {
    this.cookies = cookies;
  }

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
    if (totalScore < 0.1) {
      document.getElementById("total-score").innerHTML = `0`;
    } else {
      document.getElementById("total-score").innerHTML = `${totalScore.toFixed(
        1
      )}`;
    }
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
    document.querySelector("body").style.background =
      rootStyle.getPropertyValue("--guessed-background-color");
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".btn.check").style.display = "none";
    document.querySelector(".btn.again").style.display = "inline-block";
    document.querySelector(".number").innerHTML = `${secretNumber}`;
    this.cookies.setCookies();
  }

  updateOnClick(player, playerGuess, guessMessageElement) {
    if (playerGuess == player.secretNumber) {
      this.guessedNumber(player.secretNumber);
      guessMessageElement.innerHTML =
        "✅ You guessed the number! Changing number...";
      player.totalScore += player.currentScore;
      player.lifetimeScore += player.currentScore;
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
    document.querySelector("body").style.background =
      rootStyle.getPropertyValue("--failed-background-color");
    document.querySelector(".btn.check").style.display = "none";
    document.querySelector(".btn.again").style.display = "inline-block";
    document.querySelector(".number").innerHTML = "X";
  }

  // Private upgrade tab methods.
  #setUpgradeTabTotalScore(player) {
    let totalScoreElement = document.querySelector(
      ".upgrade-currency .currency"
    );
    totalScoreElement.innerHTML = `${player.totalScore.toFixed(1)}`;
  }

  #setUpgradeDescriptionValues(upgrade) {
    const descId = `#${upgrade.descriptionHtmlId}`;
    let ownedAmountElement = document.querySelector(`${descId} .count`);
    let spsElement = document.querySelector(`${descId} .score-per-second`);
    let currentSpsElement = document.querySelector(`${descId} .current-sps`);

    ownedAmountElement.innerHTML = `${upgrade.ownedAmount}`;
    spsElement.innerHTML = `${upgrade.scorePerSecond}`;
    currentSpsElement.innerHTML = `${upgrade.totalScorePerSecond}`;
  }

  #setUpgradeButtonValues(upgrade) {
    const buttonId = `#${upgrade.buttonsHtmlId}`;
    let buyElement = document.querySelector(`${buttonId} .buy-price`);
    let upgradeElement = document.querySelector(`${buttonId} .upgrade-price`);

    buyElement.innerHTML = `${upgrade.buyPrice}`;
    upgradeElement.innerHTML = `${upgrade.upgradePrice}`;
  }

  // Public upgrade tab methods.
  setUpgradeValuesOnPage(player, upgrade) {
    this.#setUpgradeTabTotalScore(player);

    if (upgrade.isRevealed) {
      this.#setUpgradeDescriptionValues(upgrade);
      this.#setUpgradeButtonValues(upgrade);
    }
  }
}
