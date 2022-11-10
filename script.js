"use strict";

// **********************************************
// Main page functionality, variables and updates
// **********************************************
// Shorthand for document ready with jQuery
$(function () {
  // Variables used throughout the game
  const minNumber = 1;
  let maxNumber = 10;
  let score = Math.floor(maxNumber / 2);
  let totalScore = 0;
  let prevTotalScore = totalScore;
  let secretNumber = setSecretNumber(minNumber, maxNumber);

  // Display initial values.
  setValuesOnPage();

  // Functionality for the button Again! that appears after the user runs out of their current score or if they guess correctly.
  $(".btn.again").click(function () {
    score = Math.floor(maxNumber / 2);
    resetScreen();
  });

  // Functionality for the button Check! that is under the input field.
  $(".btn.check").click(function () {
    let guess = $(".guess").val();
    let guessMessage = $(".message");

    // If the input field is empty the user is informed.
    if (!guess) {
      guessMessage.text("⛔ No number typed!");
      // If the input field has a number, a updateOnClick is performed.
      // Updates the score and total score on the screen.
      // Generates a new secret number.
    } else {
      updateOnClick(guess, guessMessage);

      if (score == 0) {
        outOfScore();
        guessMessage.text("⛔ Try again! Changing number...");
        secretNumber = setSecretNumber();
      }
    }

    // If the total score has increased the secret number needs to be changed.
    // Generating a new number for the user to guess.
    // The current score is added to the total score, which can be used in the upgrade tab.
    if (totalScore > prevTotalScore) {
      prevTotalScore = totalScore;
      secretNumber = setSecretNumber(minNumber, maxNumber);
    }
  });

  // ***********************
  // Page and game functions
  // ***********************
  function setSecretNumber() {
    return Math.floor(Math.random() * maxNumber) + minNumber;
  }

  function setBetweenRange() {
    $(".between").text(`(Between ${minNumber} and ${maxNumber})`);
  }

  function setScore(score) {
    $(".score").text(`${score}`);
  }

  function setTotalScore(totalScore) {
    $(".total-score").text(`${totalScore}`);
  }

  function setValuesOnPage() {
    setBetweenRange(minNumber, maxNumber);
    setScore(score);
    setTotalScore(totalScore.toFixed(0));
  }

  function updateOnClick(guess, guessMessage) {
    if (guess == secretNumber) {
      guessedNumber(secretNumber);
      guessMessage.html("✅ You guessed the number! Changing number...");
      totalScore += score;
    } else if (guess > secretNumber) {
      guessMessage.html("☝ Too high...");
      score--;
    } else if (guess < secretNumber) {
      guessMessage.html("👇 Too low...");
      score--;
    }
  }

  function guessedNumber(secretNumber) {
    $("body").css({ "background-color": "#60b347" });
    $(".number").css({ width: "30rem" });
    $(".btn.check").css({ display: "none" });
    $(".btn.again").css({ display: "inline-block" });
    $(".number").text(`${secretNumber}`);
  }

  function outOfScore() {
    $("body").css({ "background-color": "#ab263a" });
    $(".btn.check").css({ display: "none" });
    $(".btn.again").css({ display: "inline-block" });
    $(".number").text("X");
  }

  function resetScreen() {
    $("body").css({ "background-color": "#222" });
    $(".number").css({ width: "15rem" });
    $(".btn.again").css({ display: "none" });
    $(".btn.check").css({ display: "inline-block" });
    $(".number").text("?");
    $(".message").html("Start guessing...");
  }

  // ******************************************************
  // Upgrade tab functionality - SPU means Score Per Update
  // ******************************************************

  // Need to make the items into classes and use OOP
  $(".btn.upgrade").click(function () {
    toggleUpgradeTab();
  });

  $(".overlay").click(function () {
    toggleUpgradeTab();
  });

  $(".close-upgrade").click(function () {
    toggleUpgradeTab();
  });

  function updateUpgradeTabCurrency() {
    $(".currency").text(totalScore.toFixed(1));
  }

  function toggleUpgradeTab() {
    $(".upgrade-tab").toggleClass("hidden");
    $(".overlay").toggleClass("hidden");
    updateUpgradeTabCurrency();
  }

  let simpleAlgorithmSPU = 0.01;
  let simpleAlgorithmCount = 0;
  let simpleAlgorithmPrice = 10;

  $(".simple-algorithm button.buy-item").click(function () {
    console.log("buy 1 simple algorithm");
    buySimpleAlgorithm();
  });

  function buySimpleAlgorithm() {
    simpleAlgorithmCount++;
    simpleAlgorithmPrice += simpleAlgorithmPrice * simpleAlgorithmCount;
  }

  function totalScoreIncreaseSimpleAlgorithm() {
    totalScore += Number(simpleAlgorithmCount * simpleAlgorithmSPU);
  }

  // *********
  // Intervals
  // *********

  setInterval(function () {
    totalScoreIncreaseSimpleAlgorithm();
    setValuesOnPage();
    updateUpgradeTabCurrency();
  }, 100);
});
