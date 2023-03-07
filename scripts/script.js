// Variables used throughout the page.
function pageVariables() {
  let minNumber = 1;
  let maxNumber = 15;
  let score = Math.floor(maxNumber / 2);
  let totalScore = 0;
  let secretNumber = 5;
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

// Functions used in page functions.
function resetScreen() {
  pageVariables.isGuessed = false;
  document.querySelector("body").style.background = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".btn.again").style.display = "none";
  document.querySelector(".btn.check").style.display = "inline-block";
  document.querySelector(".number").innerHTML = "?";
  document.querySelector(".message").innerHTML = "Start guessing...";
}

// Page functions.
const initialPageState = function () {
  // Variables that set the initial values on the page.
  const variables = pageVariables();

  // Function that sets all initial values.
  setValuesOnPage();

  // Function definitions.
  function setValuesOnPage() {
    setBetweenRange();
    setScore();
    setTotalScore();

    function setBetweenRange() {
      document.getElementById(
        "between"
      ).innerHTML = `(Between ${variables.minNumber} and ${variables.maxNumber})`;
    }

    function setScore() {
      document.getElementById("score").innerHTML = `${variables.score}`;
    }

    function setTotalScore() {
      document.getElementById(
        "total-score"
      ).innerHTML = `${variables.totalScore.toFixed(1)}`;
    }
  }
};

const buttonEvents = function () {
  // Button elements.
  const btnAgain = document.querySelector(".btn.again");
  const btnCheck = document.querySelector(".btn.check");

  // Button events.
  btnAgain.addEventListener("click", function () {
    againClicked();
  });

  // Inner functions for buttons.
  function againClicked() {
    pageVariables.score = Math.floor(pageVariables.maxNumber);
    resetScreen();
  }
};

// Executing functions on the page.
initialPageState();
buttonEvents();
