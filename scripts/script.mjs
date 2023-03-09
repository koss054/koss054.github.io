// Object imports.
import { Player } from "./objects/player.mjs";
import { Page } from "./objects/page.mjs";

// Builder imports.
import { SimpleAlgorithmBuilder } from "./builders/simple-algorithm-builder.mjs";
import { FreelanceGuesserBuilder } from "./builders/freelance-guesser-builder.mjs";

// Cookie import.
import { Cookie } from "./cookies/cookies.mjs";

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
    page.cookies.setCookies();
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
        page.cookies.setCookies();
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

const upgradeItemButtonEvents = function (player, page, upgrade) {
  const btnBuy = document.querySelector(`#${upgrade.buttonsHtmlId} .buy-item`);

  btnBuy.addEventListener("click", function () {
    console.log(upgrade.ownedAmount);
    upgrade.buyUpgrade(player, page, btnBuy);
    console.log(upgrade.ownedAmount);
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

// Initializing player.
const player = new Player();

// Initializing builders.
const simpleAlgorithmBuilder = new SimpleAlgorithmBuilder();
const freelanceGuesserBuilder = new FreelanceGuesserBuilder();

// Initializing upgrades.
let simpleAlgorithm = simpleAlgorithmBuilder.createSimpleAlgorithm();
let freelanceGuesser = freelanceGuesserBuilder.createFreelanceGuesser();

// Generating upgrade HTML.
simpleAlgorithm.insertUpgradeHtml();
freelanceGuesser.insertUpgradeHtml();

// Cookies
let cookies = new Cookie(player, simpleAlgorithm, freelanceGuesser);

if (document.cookie.length > 0) {
  cookies.loadCookies(player, simpleAlgorithm);
} else {
  cookies.setCookies();
}

// Initializing page.
const page = new Page(cookies);

// Page functions.
shortcutButtonsEvents();
upgradeTabEvents(player);
buttonEvents(player, page);

// Upgrade buttons.
upgradeItemButtonEvents(player, page, simpleAlgorithm);

// Interval functions.
setInterval(function () {
  page.setValuesOnPage(player);
}, 100);

setInterval(function () {
  console.log("autosave");
  cookies.setCookies();
}, 15000); // Autosave every 15 seconds.
