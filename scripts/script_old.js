// "use strict";

// // **********************************************
// // Main page functionality, variables and updates
// // **********************************************
// // Shorthand for document ready with jQuery
// $(function () {
//   // Variables used throughout the game
//   const minNumber = 1;
//   let maxNumber = 10;
//   let score = Math.floor(maxNumber / 2);
//   let totalScore = 0;
//   let secretNumber = setSecretNumber(minNumber, maxNumber);
//   let isGuessed = false;

//   // Display initial values.
//   // setValuesOnPage();

//   // Functionality for the button Again! that appears after the user runs out of their current score or if they guess correctly.
//   // $(".btn.again").click(function () {
//   //   againClicked();
//   // });

//   // Functionality for the button Check! that is under the input field.
//   $(".btn.check").click(function () {
//     checkClicked();
//   });

//   // ***********************
//   // Page and game functions
//   // ***********************
//   function againClicked() {
//     score = Math.floor(maxNumber / 2);
//     resetScreen();
//   }

//   function checkClicked() {
//     let guess = $(".guess").val();
//     let guessMessage = $(".message");

//     // If the input field is empty the user is informed.
//     if (!guess) {
//       guessMessage.text("⛔ No number typed!");
//       // If the input field has a number, a updateOnClick is performed.
//       // Updates the score and total score on the screen.
//       // Generates a new secret number.
//     } else {
//       updateOnClick(guess, guessMessage);

//       if (score == 0) {
//         outOfScore();
//         guessMessage.text("⛔ Try again! Changing number...");
//         secretNumber = setSecretNumber();
//       }
//     }
//   }

//   function setSecretNumber() {
//     return Math.floor(Math.random() * maxNumber) + minNumber;
//   }

//   function setBetweenRange() {
//     $(".between").text(`(Between ${minNumber} and ${maxNumber})`);
//   }

//   function setScore(score) {
//     $(".score").text(`${score}`);
//   }

//   function setTotalScore(totalScore) {
//     $(".total-score").text(`${totalScore}`);
//   }

//   function setValuesOnPage() {
//     setBetweenRange(minNumber, maxNumber);
//     setScore(score);
//     setTotalScore(totalScore.toFixed(1));
//   }

//   function updateOnClick(guess, guessMessage) {
//     if (guess == secretNumber) {
//       guessedNumber(secretNumber);
//       guessMessage.html("✅ You guessed the number! Changing number...");
//       totalScore += score;
//       secretNumber = setSecretNumber();
//       isGuessed = true;
//     } else if (guess > secretNumber) {
//       guessMessage.html("☝ Too high...");
//       score--;
//     } else if (guess < secretNumber) {
//       guessMessage.html("👇 Too low...");
//       score--;
//     }
//   }

//   function guessedNumber(secretNumber) {
//     $("body").css({ "background-color": "#60b347" });
//     $(".number").css({ width: "30rem" });
//     $(".btn.check").css({ display: "none" });
//     $(".btn.again").css({ display: "inline-block" });
//     $(".number").text(`${secretNumber}`);
//   }

//   function outOfScore() {
//     $("body").css({ "background-color": "#ab263a" });
//     $(".btn.check").css({ display: "none" });
//     $(".btn.again").css({ display: "inline-block" });
//     $(".number").text("X");
//   }

//   function resetScreen() {
//     isGuessed = false;
//     $("body").css({ "background-color": "#222" });
//     $(".number").css({ width: "15rem" });
//     $(".btn.again").css({ display: "none" });
//     $(".btn.check").css({ display: "inline-block" });
//     $(".number").text("?");
//     $(".message").html("Start guessing...");
//   }

//   $("input").bind("enterKey", function (e) {
//     if (score > 0 && !isGuessed) {
//       checkClicked();
//     } else {
//       againClicked();
//     }
//   });
//   $("input").keyup(function (e) {
//     if (e.keyCode == 13) {
//       $(this).trigger("enterKey");
//     }
//   });

//   // ******************************************************
//   // Upgrade tab functionality - SPU means Score Per Update
//   // ******************************************************

//   // Need to make the items into classes and use OOP
//   $(".btn.upgrade").click(function () {
//     toggleUpgradeTab();
//   });

//   $(".overlay").click(function () {
//     toggleUpgradeTab();
//   });

//   $(".close-upgrade").click(function () {
//     toggleUpgradeTab();
//   });

//   function updateUpgradeTabCurrency() {
//     $(".currency").text(totalScore.toFixed(1));
//   }

//   function toggleUpgradeTab() {
//     $(".upgrade-tab").toggleClass("hidden");
//     $(".overlay").toggleClass("hidden");
//     updateUpgradeTabCurrency();
//   }

//   let simpleAlgorithmSPU = 0.001;
//   let simpleAlgorithmCount = 0;

//   let simpleAlgorithmBuyPrice = 10;
//   const simpleAlgorithmBuyPriceIncrease = 10;

//   let simpleAlgorithmUpgradePrice = 15;
//   const simpleAlgorithmUpgradePriceIncrease = 15;

//   $(".simple-algorithm button.buy-item").click(function () {
//     buySimpleAlgorithm();
//   });

//   $(".simple-algorithm button.upgrade-it").click(function () {
//     upgradeSimpleAlgorithm();
//   });

//   $(".simple-algorithm button.sell-item").click(function () {
//     sellSimpleAlgorithm();
//   });

//   function buySimpleAlgorithm() {
//     if (totalScore >= simpleAlgorithmBuyPrice) {
//       totalScore -= simpleAlgorithmBuyPrice;
//       simpleAlgorithmCount++;
//       simpleAlgorithmBuyPrice =
//         simpleAlgorithmCount * simpleAlgorithmBuyPriceIncrease +
//         simpleAlgorithmBuyPriceIncrease;
//       updateSimpleAlgorithmInfo();
//     } else {
//       $(".simple-algorithm button.buy-item").shake();
//     }
//   }

//   function upgradeSimpleAlgorithm() {
//     if (totalScore >= simpleAlgorithmUpgradePrice && simpleAlgorithmCount > 0) {
//       totalScore -= simpleAlgorithmUpgradePrice;
//       simpleAlgorithmSPU += 0.01;
//       simpleAlgorithmUpgradePrice += simpleAlgorithmUpgradePriceIncrease;
//       updateSimpleAlgorithmInfo();
//     } else {
//       $(".simple-algorithm button.upgrade-it").shake();
//     }
//   }

//   function sellSimpleAlgorithm() {
//     if (simpleAlgorithmCount > 0) {
//       totalScore += simpleAlgorithmBuyPrice - simpleAlgorithmBuyPriceIncrease;
//       simpleAlgorithmCount--;
//       simpleAlgorithmBuyPrice =
//         simpleAlgorithmCount * simpleAlgorithmBuyPriceIncrease +
//         simpleAlgorithmBuyPriceIncrease;
//       updateSimpleAlgorithmInfo();
//     } else {
//       $(".simple-algorithm button.sell-item").shake();
//     }
//   }

//   function updateSimpleAlgorithmInfo() {
//     $(".simple-algorithm span.count").text(simpleAlgorithmCount);
//     $(".simple-algorithm button.price").text(simpleAlgorithmBuyPrice);
//     $(".simple-algorithm .buy-price").text(simpleAlgorithmBuyPrice);
//     $(".simple-algorithm .upgrade-price").text(simpleAlgorithmUpgradePrice);
//     $(".simple-algorithm .sell-price").text(
//       simpleAlgorithmBuyPrice - simpleAlgorithmBuyPriceIncrease
//     );
//     $(".simple-algorithm .current-sps").text(
//       (simpleAlgorithmSPU * simpleAlgorithmCount * 10).toFixed(1)
//     );
//   }

//   function totalScoreIncreaseSimpleAlgorithm() {
//     totalScore += Number(simpleAlgorithmCount * simpleAlgorithmSPU);
//   }

//   // *********
//   // Intervals
//   // *********

//   setInterval(function () {
//     totalScoreIncreaseSimpleAlgorithm();
//     setValuesOnPage();
//     updateUpgradeTabCurrency();
//   }, 100);
// });

// // ****************
// // jQuery Functions
// // ****************

// $.fn.shake = function (interval = 100) {
//   this.addClass("shaking");
//   this.css("transition", "all " + (interval / 100).toString() + "s");
//   setTimeout(() => {
//     this.css("transform", "translateX(-50%)");
//   }, interval * 0);
//   setTimeout(() => {
//     this.css("transform", "translateX(50%)");
//   }, interval * 1);
//   setTimeout(() => {
//     this.css("transform", "translateX(-25%)");
//   }, interval * 2);
//   setTimeout(() => {
//     this.css("transform", "translateX(25%)");
//   }, interval * 3);
//   setTimeout(() => {
//     this.css("transform", "translateX(-7%)");
//   }, interval * 4);
//   setTimeout(() => {
//     this.css("transform", "translateX(0%)");
//   }, interval * 5);
//   this.removeClass("shaking");
// };
