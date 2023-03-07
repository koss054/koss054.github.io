// Variables used throughout the page.
function pageVariables() {
  let minNumber = 1;
  let maxNumber = 15;
  let score = Math.floor(maxNumber / 2);
  let totalScore = 0;
  let secretNumber = 5;

  return {
    minNumber,
    maxNumber,
    score,
    totalScore,
    secretNumber,
  };
}

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

// Executing functions on the page.
initialPageState();
