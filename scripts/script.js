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

class Upgrade {
  constructor(
    descriptionHtmlId,
    buttonsHtmlId,
    requiredScoreToReveal,
    isRevealed,
    name,
    ownedAmount,
    scorePerSecond,
    totalScorePerSecond,
    description,
    buyPrice,
    upgradePrice,
    sellPrice
  ) {
    this.descriptionHtmlId = descriptionHtmlId;
    this.buttonsHtmlId = buttonsHtmlId;

    this.requiredScoreToReveal = requiredScoreToReveal;
    this.isRevealed = isRevealed;

    this.name = name;

    this.ownedAmount = ownedAmount;
    this.scorePerSecond = scorePerSecond;
    this.totalScorePerSecond = totalScorePerSecond;

    this.description = description;

    this.buyPrice = buyPrice;
    this.upgradePrice = upgradePrice;
    this.sellPrice = sellPrice;
  }

  #descriptionHtmlTemplate() {
    let htmlTemplate = `<div class="item">
      <h2 class="item-name">${this.name}</h3>
      <span class="item-info">
        Owned: <span class="count">${this.ownedAmount}</span> 
        // Score Per Second: <span class="score-per-second">${this.scorePerSecond}</span> 
        // Current SPS: <span class="current-sps">${this.totalScorePerSecond}</span>
      </span>
      <p class="item-description">
        ${this.description}
      </p>
    </div>`;

    return htmlTemplate;
  }

  #buttonsHtmlTemplate() {
    let htmlTemplate = `<button class="btn buy-item">Buy <span class="amount">1</span> <span class="price-symbol">🥇</span><span
    class="buy-price">${this.buyPrice}</span></button>
    <button class="btn upgrade-it">Upgrade It <span class="price-symbol">🥇</span><span
        class="upgrade-price">${this.upgradePrice}</span></button>
    <button class="btn sell-item">Sell <span class="amount">1</span> <span class="price-symbol">🥇</span><span
        class="sell-price">${this.sellPrice}</span></button>`;

    return htmlTemplate;
  }

  #insertUpgradeDescriptionHtml() {
    const parentHtmlElement = document.getElementById(this.descriptionHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      this.#descriptionHtmlTemplate()
    );
  }

  #insertUpgradeButtonsHtml() {
    const parentHtmlElement = document.getElementById(this.buttonsHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      this.#buttonsHtmlTemplate()
    );
  }

  #insertUnrevealedUpgradeHtml() {
    const parentHtmlElement = document.getElementById(this.descriptionHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      `<h2 style="margin-bottom: 2rem">????????</h2><p style="color: rgb(158, 158, 158)">?????????????????</p>`
    );
  }

  insertUpgradeHtml() {
    if (this.isRevealed) {
      this.#insertUpgradeDescriptionHtml();
      this.#insertUpgradeButtonsHtml();
    } else {
      this.#insertUnrevealedUpgradeHtml();
    }
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

// Shortcut buttons function.
const shortcutButtonsEvents = function () {
  const userGuess = document.getElementById("guess");

  const minNumberBtn = document.getElementById("min-number");
  const midNumberBtn = document.getElementById("mid-number");
  const maxNumberBtn = document.getElementById("max-number");

  const upArrow = document.getElementById("guess-upper");
  const downArrow = document.getElementById("guess-lower");

  minNumberBtn.addEventListener("click", function () {
    let minNumber = Number(minNumberBtn.innerHTML);
    userGuess.value = minNumber;
  });

  midNumberBtn.addEventListener("click", function () {
    let midNumber = Number(midNumberBtn.innerHTML);
    userGuess.value = midNumber;
  });

  maxNumberBtn.addEventListener("click", function () {
    let maxNumber = Number(maxNumberBtn.innerHTML);
    userGuess.value = maxNumber;
  });

  upArrow.addEventListener("click", function () {
    arrowGuessUpdate("up");
  });

  downArrow.addEventListener("click", function () {
    arrowGuessUpdate("down");
  });

  function arrowGuessUpdate(direction) {
    if (!userGuess.value) {
      userGuess.value = 1;
    } else if (direction === "up") {
      userGuess.value++;
    } else if (direction === "down") {
      userGuess.value--;
    }
  }
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
shortcutButtonsEvents();
upgradeTabEvents(player);
buttonEvents(player, page);

// Initializing upgrades.
const simpleAlgorithm = new Upgrade(
  "simple-algorithm-description",
  "simple-algorithm-buttons",
  0,
  true,
  "Simple Algorithm",
  0,
  0.1,
  0.0,
  "Tired of guessing by yourself? Get a simple algorithm!",
  10,
  15,
  10
);

const freelanceGuesser = new Upgrade(
  "freelance-guesser-description",
  "freelance-guesser-buttons",
  0,
  false,
  "Freelance Guesser",
  0,
  1,
  0.0,
  "You're a freelance guesser? Get a freelance guesser!",
  10,
  15,
  10
);

// Generating upgrade HTML.
simpleAlgorithm.insertUpgradeHtml();
freelanceGuesser.insertUpgradeHtml();

// Interval function(s).
setInterval(function () {
  page.setValuesOnPage(player);
}, 100);
