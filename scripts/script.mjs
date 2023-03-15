// Object imports.
import { Player } from "./objects/player.mjs";
import { Page } from "./objects/page.mjs";

// Builder imports.
import { SimpleAlgorithmBuilder } from "./builders/simple-algorithm-builder.mjs";
import { FreelanceGuesserBuilder } from "./builders/freelance-guesser-builder.mjs";

// Root import.
import { Root } from "./color-themes/css-root.mjs";

// Cookie import.
import { Cookie } from "./cookies/cookies.mjs";

// TO DO: Move functions to separate files so script.mjs is cleaner.
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
        player.removeScoreOnFail();
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

const upgradeItemButtonEvents = function (player, page, upgrades) {
  for (const upgrade of upgrades) {
    if (upgrade.isRevealed) {
      const btnBuy = document.querySelector(
        `#${upgrade.buttonsHtmlId} .buy-item`
      );

      const btnUpgrade = document.querySelector(
        `#${upgrade.buttonsHtmlId} .upgrade-it`
      );

      btnBuy.addEventListener("click", function () {
        upgrade.buyUpgrade(player, page, btnBuy);
      });

      btnUpgrade.addEventListener("click", function () {
        upgrade.improveUpgrade(player, page, btnUpgrade);
      });
    }
  }
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

function setUpgradeTabValues(player, page, upgrades) {
  for (const upgrade of upgrades) {
    if (upgrade.isRevealed) {
      page.setUpgradeValuesOnPage(player, upgrade);
    }
  }
}

// Theme functions.
function setThemeEvents() {
  const root = new Root();

  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");

  lightThemeBtn.addEventListener("click", function () {
    root.applyDarkTheme();
    lightThemeBtn.classList.add("hidden");
    darkThemeBtn.classList.remove("hidden");
  });

  darkThemeBtn.addEventListener("click", function () {
    root.applyMainTheme();
    lightThemeBtn.classList.remove("hidden");
    darkThemeBtn.classList.add("hidden");
  });
}

// Initializing player.
const player = new Player();

// Initializing builders.
const simpleAlgorithmBuilder = new SimpleAlgorithmBuilder();
const freelanceGuesserBuilder = new FreelanceGuesserBuilder();

// Initializing upgrades.
let simpleAlgorithm = simpleAlgorithmBuilder.createSimpleAlgorithm();
let freelanceGuesser = freelanceGuesserBuilder.createFreelanceGuesser();

// Upgrade array.
const upgrades = [simpleAlgorithm, freelanceGuesser];

// Cookies
let cookies = new Cookie(player, upgrades);

if (document.cookie.length > 0) {
  cookies.loadCookies(player, simpleAlgorithm);
} else {
  cookies.setCookies();
}

// Initializing page.
const page = new Page(cookies);
player.setInitialUpgradesHtml(upgrades);
setUpgradeTabValues(player, page, upgrades);
setThemeEvents();

// Page functions.
shortcutButtonsEvents();
upgradeTabEvents(player);
buttonEvents(player, page);

// Interval functions.
setInterval(function () {
  player.updateScoreEveryMillisecond();
});

setInterval(function () {
  page.setValuesOnPage(player);
  player.setScorePerSecond(upgrades);
  setUpgradeTabValues(player, page, upgrades);
}, 100);

setInterval(function () {
  player.revealUpgrades(upgrades, cookies);
  upgradeItemButtonEvents(player, page, upgrades);
}, 1000); // Updates the socre every second, depending on the current score per second.

setInterval(function () {
  console.log("Game has been autosaved...");
  console.log(`Player sps: ${player.scorePerSecond}`);
  cookies.setCookies();
}, 15000); // Autosave every 15 seconds.
