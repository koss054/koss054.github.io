export class Cookie {
  constructor(player, upgrades) {
    this.player = player;
    this.upgrades = upgrades;
  }

  #setPlayerCookies() {
    document.cookie = `minNum=${this.player.minNumber}`;
    document.cookie = `maxNum=${this.player.maxNumber}`;
    document.cookie = `sPS=${this.player.scorePerSecond}`;
    document.cookie = `currScore=${this.player.currentScore}`;
    document.cookie = `totalScore=${this.player.totalScore.toFixed(1)}`;
    document.cookie = `secretNum=${this.player.secretNumber}`;
    document.cookie = `isGuessed=${this.player.isGuessed}`;
    document.cookie = `lifetimeScore=${this.player.lifetimeScore.toFixed(1)}`;

    return document.cookie;
  }

  #setSimpleAlgorithmCookies() {
    const sa = this.upgrades[0];
    document.cookie = `saReveal=${sa.isRevealed}`;

    if (sa.isRevealed) {
      document.cookie = `saOwned=${sa.ownedAmount}`;
      document.cookie = `saSps=${sa.scorePerSecond}`;
      document.cookie = `saTsps=${sa.totalScorePerSecond}`;
      document.cookie = `saBuy=${sa.buyPrice}`;
      document.cookie = `saUpgrade=${sa.upgradePrice}`;
    }

    return document.cookie;
  }

  setCookies() {
    document.cookie = this.#setPlayerCookies();
    document.cookie = this.#setSimpleAlgorithmCookies();
  }

  #getCookiesObject = () =>
    document.cookie
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

  #loadPlayerCookies(player, currCookies) {
    player.minNumber = Number(currCookies.minNum);
    player.maxNumber = Number(currCookies.maxNum);
    player.scorePerSecond = Number(currCookies.sPS);
    player.currentScore = Number(currCookies.currScore);
    player.totalScore = Number(currCookies.totalScore);
    player.secretNumber = Number(currCookies.secretNum);
    player.isGuessed = Boolean(currCookies.isGuessed);
    player.lifetimeScore = Number(currCookies.lifetimeScore);
  }

  #loadSimpleAlgorithmCookies(sa, currCookies) {
    sa.isRevealed = Boolean(currCookies.saReveal);

    if (sa.isRevealed) {
      sa.ownedAmount = Number(currCookies.saOwned);
      sa.scorePerSecond = Number(currCookies.saSps);
      sa.totalScorePerSecond = Number(currCookies.saTsps);
      sa.buyPrice = Number(currCookies.saBuy);
      sa.upgradePrice = Number(currCookies.saUpgrade);
    }
  }

  loadCookies(player, ...upgrades) {
    const currentCookies = this.#getCookiesObject();
    this.#loadPlayerCookies(player, currentCookies);
    this.#loadSimpleAlgorithmCookies(upgrades[0], currentCookies);
  }
}
