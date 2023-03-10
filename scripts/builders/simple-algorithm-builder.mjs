import { Upgrade } from "../objects/upgrade.mjs";

export class SimpleAlgorithmBuilder {
  constructor() {
    this.simpleAlgorithm = this.#reset();
  }

  #reset() {
    return new Upgrade();
  }

  #setHtmlIds(item) {
    item.descriptionHtmlId = "simple-algorithm-description";
    item.buttonsHtmlId = "simple-algorithm-buttons";
  }

  #setRequiredScoreToReveal(item) {
    item.requiredScoreToReveal = 10;
  }

  #setIsRevealed(item) {
    item.isRevealed = false;
  }

  #setName(item) {
    item.name = "Simple Algorithm";
  }

  #setOwnedAmount(item) {
    item.ownedAmount = 0;
  }

  #setScorePerSecond(item) {
    item.scorePerSecond = 0.1;
  }

  #setTotalScorePerSecond(item) {
    item.totalScorePerSecond = 0;
  }

  #setDescription(item) {
    item.description = "Tired of guessing by yourself? Get a simple algorithm!";
  }

  #setBuyPrice(item) {
    item.buyPrice = 10;
  }

  #setUpgradePrice(item) {
    item.upgradePrice = 15;
  }

  createSimpleAlgorithm() {
    this.#setHtmlIds(this.simpleAlgorithm);
    this.#setRequiredScoreToReveal(this.simpleAlgorithm);
    this.#setIsRevealed(this.simpleAlgorithm);
    this.#setName(this.simpleAlgorithm);
    this.#setOwnedAmount(this.simpleAlgorithm);
    this.#setScorePerSecond(this.simpleAlgorithm);
    this.#setTotalScorePerSecond(this.simpleAlgorithm);
    this.#setDescription(this.simpleAlgorithm);
    this.#setBuyPrice(this.simpleAlgorithm);
    this.#setUpgradePrice(this.simpleAlgorithm);

    return this.simpleAlgorithm;
  }
}
