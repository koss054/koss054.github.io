// Variables used throughout the page.
function pageVariables() {
  let minNumber = 1;
  let maxNumber = 5;
  let score = Math.floor(maxNumber / 2);
  let totalScore = 0;
  let secretNumber = Math.floor(Math.random() * maxNumber) + minNumber;
  let isGuessed = false;

  return {
    minNumber,
    maxNumber,
    score,
    totalScore,
    secretNumber,
    isGuessed,
  };
}

let vars = pageVariables();

// Functions used in page functions.
function setValuesOnPage() {
  setBetweenRange();
  setScore();
  setTotalScore();
}

function setBetweenRange() {
  document.getElementById(
    "between"
  ).innerHTML = `(Between ${vars.minNumber} and ${vars.maxNumber})`;
}

function setScore() {
  document.getElementById("score").innerHTML = `${vars.score}`;
}

function setTotalScore() {
  document.getElementById("total-score").innerHTML = `${vars.totalScore.toFixed(
    1
  )}`;
}

function setSecretNumber() {
  return Math.floor(Math.random() * vars.maxNumber) + vars.minNumber;
}

function resetScreen() {
  pageVariables.isGuessed = false;
  document.querySelector("body").style.background = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".btn.again").style.display = "none";
  document.querySelector(".btn.check").style.display = "inline-block";
  document.querySelector(".number").innerHTML = "?";
  document.querySelector("#message").innerHTML = "Start guessing...";
}

function updateOnClick(userGuess, guessMessageElement) {
  if (userGuess == vars.secretNumber) {
    guessedNumber(vars.secretNumber);
    guessMessageElement.innerHTML =
      "✅ You guessed the number! Changing number...";
    vars.totalScore += vars.score;
    vars.secretNumber = setSecretNumber();
    vars.isGuessed = true;
  } else if (userGuess > vars.secretNumber) {
    guessMessageElement.innerHTML = "☝ Too high...";
    vars.score--;
  } else if (userGuess < vars.secretNumber) {
    guessMessageElement.innerHTML = "👇 Too low...";
    vars.score--;
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
const initialPageState = function () {
  // Function that sets all initial values.
  setValuesOnPage(vars.minNumber, vars.maxNumber, vars.score, vars.totalScore);
};

const buttonEvents = function () {
  // Button elements.
  const btnAgain = document.querySelector(".btn.again");
  const btnCheck = document.querySelector(".btn.check");

  // Button events.
  btnAgain.addEventListener("click", function () {
    againClicked();
  });

  btnCheck.addEventListener("click", function () {
    checkClicked();
  });

  // Inner functions for buttons.
  function againClicked() {
    vars.score = Math.floor(vars.maxNumber / 2);
    resetScreen();
  }

  function checkClicked() {
    const userGuess = document.getElementById("guess").value;
    const guessMessage = document.getElementById("message");

    if (!userGuess) {
      guessMessage.innerHTML = `⛔ Type a number between ${vars.minNumber} and ${vars.maxNumber}...`;
    } else {
      updateOnClick(userGuess, guessMessage);

      if (vars.score == 0) {
        outOfScore();
        guessMessage.text("⛔ Try again! Changing number...");
        vars.secretNumber = setSecretNumber(vars.minNumber, vars.maxNumber);
      }
    }
  }
};

// Interval functions.
setInterval(function () {
  setValuesOnPage(vars.minNumber, vars.maxNumber, vars.score, vars.totalScore);
  console.log(vars.score);
}, 100);

// Executing functions on the page.
initialPageState();
buttonEvents();
