// Variables that set the initial values on the page.
const minNumber = 1;
const maxNumber = 20;
const score = Math.floor(maxNumber / 2);
const totalScore = 0;
const secretNumber = 5;

// Function that sets all initial values.
setValuesOnPage();

// Function definitions.
function setValuesOnPage() {
  setBetweenRange(minNumber, maxNumber);
  setScore(score);
  setTotalScore(totalScore.toFixed(1));
}

function setBetweenRange() {
  const betweenText = document.getElementById("between");
  console.log(betweenText);
  betweenText.innerHTML = `(Between ${minNumber} and ${maxNumber})`;
}

function setScore(score) {
  document.getElementsByClassName("score").innerHTML = `${score}`;
}

function setTotalScore(totalScore) {
  document.getElementsByClassName("total-score").innerHTML = `${totalScore}`;
}
