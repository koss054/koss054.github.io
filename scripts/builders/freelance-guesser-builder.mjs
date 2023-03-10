import { Upgrade } from "../objects/upgrade.mjs";

export class FreelanceGuesserBuilder {
  constructor() {
    this.freelanceGuesser = this.#reset();
  }

  #reset() {
    return new Upgrade();
  }

  #setHtmlIds(item) {
    item.descriptionHtmlId = "freelance-guesser-description";
    item.buttonsHtmlId = "freelance-guesser-buttons";
  }

  #setRequiredScoreToReveal(item) {
    item.requiredScoreToReveal = 100;
  }

  #setIsRevealed(item) {
    item.isRevealed = false;
  }

  #setName(item) {
    item.name = "Freelance Guesser";
  }

  #setOwnedAmount(item) {
    item.ownedAmount = 0;
  }

  #setScorePerSecond(item) {
    item.scorePerSecond = 1;
  }

  #setTotalScorePerSecond(item) {
    item.totalScorePerSecond = 0;
  }

  #setDescription(item) {
    item.description = "You're a freelance guesser? Get a freelance guesser!";
  }

  #setBuyPrice(item) {
    item.buyPrice = 50;
  }

  #setUpgradePrice(item) {
    item.upgradePrice = 75;
  }

  createFreelanceGuesser() {
    this.#setHtmlIds(this.freelanceGuesser);
    this.#setRequiredScoreToReveal(this.freelanceGuesser);
    this.#setIsRevealed(this.freelanceGuesser);
    this.#setName(this.freelanceGuesser);
    this.#setOwnedAmount(this.freelanceGuesser);
    this.#setScorePerSecond(this.freelanceGuesser);
    this.#setTotalScorePerSecond(this.freelanceGuesser);
    this.#setDescription(this.freelanceGuesser);
    this.#setBuyPrice(this.freelanceGuesser);
    this.#setUpgradePrice(this.freelanceGuesser);

    return this.freelanceGuesser;
  }
}
