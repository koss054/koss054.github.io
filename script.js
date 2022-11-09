"use strict";

$(function () {
  const minNumber = 1;
  let maxNumber = 10;
  let score = Math.floor(maxNumber / 2);
  let totalScore = 0;
  let prevTotalScore = totalScore;
  let secretNumber = setSecretNumber(minNumber, maxNumber);

  setBetweenRange(minNumber, maxNumber);
  setScore(score);
  setTotalScore(totalScore);

  $(".btn.again").click(function () {
    score = Math.floor(maxNumber / 2);

    resetScreen();
    setBetweenRange(minNumber, maxNumber);
    setScore(score);
    setTotalScore(totalScore);
  });

  $(".btn.check").click(function () {
    setBetweenRange(minNumber, maxNumber);
    setScore(score);
    setTotalScore(totalScore);

    let guess = $(".guess").val();
    let guessMessage = $(".message");

    // If the input field is empty the user is informed.
    if (!guess) {
      guessMessage.text("⛔ No number typed!");
      // If the input field has a number, a updateOnClick is performed.
      // Updates the score and total score on the screen.
      // Generates a new secret number.
    } else {
      updateOnClick(
        secretNumber,
        guess,
        guessMessage,
        score,
        totalScore,
        maxNumber
      );

      score = getScore();
      totalScore = getTotalScore();

      if (score == 0) {
        outOfScore();
        guessMessage.text("⛔ Try again! Changing number...");
        secretNumber = setSecretNumber(minNumber, maxNumber);
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

  function setSecretNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function setBetweenRange(min, max) {
    $(".between").text(`(Between ${min} and ${max})`);
  }

  function getScore() {
    return Number($(".score").text());
  }

  function setScore(score) {
    $(".score").text(`${score}`);
  }

  function getTotalScore() {
    return Number($(".total-score").text());
  }

  function setTotalScore(totalScore) {
    $(".total-score").text(`${totalScore}`);
  }

  function updateOnClick(
    secretNumber,
    guess,
    guessMessage,
    score,
    totalScore,
    max
  ) {
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

    setScore(score);
    setTotalScore(totalScore);
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
});
