// Animation import.
import { shake } from "../animations/button-animation.mjs";

// Upgrade object.
export class Upgrade {
  // Html templates.
  #descriptionHtmlTemplate() {
    let htmlTemplate = `<div class="item">
        <h2 class="item-name">${this.name}</h3>
        <span class="item-info">
          Owned: <span class="count">${this.ownedAmount}</span> 
          // Score Per Second: <span class="score-per-second">${this.scorePerSecond}</span> 
          // Current SPS: <span class="current-sps">${this.totalScorePerSecond}</span>
        </span>
        <p class="item-description">
          ${this.description}
        </p>
      </div>`;

    return htmlTemplate;
  }

  #buttonsHtmlTemplate() {
    let htmlTemplate = `<button class="btn buy-item">Buy <span class="amount">1</span> <span class="price-symbol">🥇</span><span
      class="buy-price">${this.buyPrice}</span></button>
      <button class="btn upgrade-it">Upgrade It <span class="price-symbol">🥇</span><span
          class="upgrade-price">${this.upgradePrice}</span></button>`;

    return htmlTemplate;
  }

  // Insert html templates.
  #insertUpgradeDescriptionHtml() {
    const parentHtmlElement = document.getElementById(this.descriptionHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      this.#descriptionHtmlTemplate()
    );
  }

  #insertUpgradeButtonsHtml() {
    const parentHtmlElement = document.getElementById(this.buttonsHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      this.#buttonsHtmlTemplate()
    );
  }

  #insertUnrevealedUpgradeHtml() {
    const parentHtmlElement = document.getElementById(this.descriptionHtmlId);
    parentHtmlElement.insertAdjacentHTML(
      "afterbegin",
      `<h2 style="margin-bottom: 2rem">????????</h2><p style="color: rgb(158, 158, 158)">?????????????????</p>`
    );
  }

  insertUpgradeHtml() {
    if (this.isRevealed) {
      this.#insertUpgradeDescriptionHtml();
      this.#insertUpgradeButtonsHtml();
    } else {
      this.#insertUnrevealedUpgradeHtml();
    }
  }

  #clearUpgradeDescriptionHtml() {
    const parentHtmlElement = document.getElementById(this.descriptionHtmlId);
    parentHtmlElement.innerHTML = "";
  }

  #clearUpgradeButtonsHtml() {
    const parentHtmlElement = document.getElementById(this.buttonsHtmlId);
    parentHtmlElement.innerHTML = "";
  }

  clearUpgradeHtml() {
    this.#clearUpgradeDescriptionHtml();
    this.#clearUpgradeButtonsHtml();
  }

  // Upgrade buy/upgrade/sell button actions.
  #increaseTotalScorePerSecond() {
    const currentTSPS = Number(this.totalScorePerSecond);
    const currentSPS = Number(this.scorePerSecond);
    return (currentTSPS + currentSPS).toFixed(1);
  }

  #increasePrice(priceToIncrease) {
    let multiplier = 1.1;

    if (this.ownedAmount >= 10 && this.ownedAmount < 25) {
      multiplier = 1.2;
    } else if (this.ownedAmount >= 25 && this.ownedAmount < 50) {
      multiplier = 1.5;
    }

    return (priceToIncrease * multiplier).toFixed(1);
  }

  buyUpgrade(player, page, button) {
    if (player.totalScore >= this.buyPrice) {
      player.totalScore -= this.buyPrice;
      this.ownedAmount++;
      this.buyPrice = this.#increasePrice(this.buyPrice);
      this.totalScorePerSecond = this.#increaseTotalScorePerSecond();
      page.setUpgradeValuesOnPage(player, this);
    } else {
      shake(button);
    }
  }

  improveUpgrade(player, page, button) {
    if (player.totalScore >= this.upgradePrice && this.ownedAmount > 0) {
      player.totalScore -= this.upgradePrice;
      this.scorePerSecond += this.scorePerSecond;
      this.upgradePrice = this.#increasePrice(this.upgradePrice) * 5;
      this.totalScorePerSecond = this.#increaseTotalScorePerSecond();
      page.setUpgradeValuesOnPage(player, this);
    } else {
      shake(button);
    }
  }
}
