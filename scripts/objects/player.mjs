// Player stats.
export class Player {
  #WEIRD_NUM_LOL = 0.000000000000000000000001;

  constructor() {
    this.minNumber = 1;
    this.maxNumber = 5;

    this.scorePerSecond = this.#WEIRD_NUM_LOL;
    this.currentScore = Math.ceil(this.maxNumber / 2);
    this.totalScore = this.#WEIRD_NUM_LOL;

    // TODO: Make secret number private to it can't be taken from the dev console.
    // Easy fix but rn I'm too lazy to update it ;D
    this.secretNumber =
      Math.floor(Math.random() * this.maxNumber) + this.minNumber;
    this.isGuessed = false;

    this.lifetimeScore = this.#WEIRD_NUM_LOL;
  }

  resetScore() {
    this.currentScore = Math.ceil(this.maxNumber / 2);
  }

  setSecretNumber() {
    this.secretNumber =
      Math.floor(Math.random() * this.maxNumber) + this.minNumber;
  }

  removeScoreOnFail() {
    const reduceBy = Math.ceil(this.maxNumber / 2);
    if (this.totalScore - reduceBy < 1) {
      this.totalScore = 0.0;
    } else {
      this.totalScore -= reduceBy;
    }
  }

  setScorePerSecond(upgrades) {
    let totalSPS = 0;

    for (const upgrade of upgrades) {
      const upgradeTSPS = Number(upgrade.totalScorePerSecond);
      if (upgrade.totalScorePerSecond > 0) {
        totalSPS += upgradeTSPS;
      }
    }

    this.scorePerSecond = totalSPS;
  }

  updateScoreEverySecond() {
    this.totalScore += this.scorePerSecond;
    this.lifetimeScore += this.scorePerSecond;
  }

  setInitialUpgradesHtml(upgrades) {
    for (const upgrade of upgrades) {
      upgrade.insertUpgradeHtml();
    }
  }

  // Will eventually improve how upgrades are stored.
  // Currently using indexes, but it could get messy in the feature.
  // Gotta try and use objects instead, making the "index" the name of the upgrade.
  revealUpgrades(upgrades, cookies) {
    let isSARevealed = false; // Simple Algorithm - index 0;
    let isFGRevealed = false; // Freelance Guesser - index 1;

    if (this.lifetimeScore >= 10 && isSARevealed == false) {
      upgrades[0].isRevealed = true;
      isSARevealed = true;
      upgrades[0].clearUpgradeHtml();
      upgrades[0].insertUpgradeHtml();
      cookies = document.cookie;
    }

    if (this.lifetimeScore >= 1000 && isFGRevealed == false) {
      upgrades[1].isRevealed = true;
      isFGRevealed = true;
      upgrades[1].clearUpgradeHtml();
      upgrades[1].insertUpgradeHtml();
      cookies.setCookies();
    }
  }
}
