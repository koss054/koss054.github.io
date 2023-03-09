export class Cookie {
  constructor(player, ...upgrades) {
    this.player = player;
    this.upgrades = upgrades;
  }

  getCookies = () => document.cookie;

  setPlayerCookies() {
    document.cookie = `minNum=${this.player.minNumber}`;
    document.cookie = `maxNum=${this.player.maxNumber}`;
    document.cookie = `currScore=${this.player.currentScore}`;
    document.cookie = `totalScore=${this.player.totalScore}`;
    document.cookie = `secretNum=${this.player.secretNumber}`;
    document.cookie = `isGuessed=${this.player.isGuessed}`;

    return document.cookie;
  }

  setSimpleAlgorithmCookies() {
    const sa = this.upgrades[0];
    document.cookie = `sa-reveal=${sa.isRevealed}`;
    document.cookie = `sa-owned=${sa.ownedAmount}`;
    document.cookie = `sa-sps=${sa.scorePerSecond}`;
    document.cookie = `sa-tsps=${sa.totalScorePerSecond}`;
    document.cookie = `sa-buy=${sa.buyPrice}`;
    document.cookie = `sa-upgrade=${sa.upgradePrice}`;
    document.cookie = `sa-sell=${sa.sellPrice}`;

    return document.cookie;
  }

  setCookies() {
    document.cookie = this.setPlayerCookies();
    document.cookie = this.setSimpleAlgorithmCookies();

    return document.cookie;
  }
}
