// Animation import.
import { shake } from "../animations/button-animation.mjs";

// Upgrade object.
export class Upgrade {
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
          class="upgrade-price">${this.upgradePrice}</span></button>
      <button class="btn sell-item">Sell <span class="amount">1</span> <span class="price-symbol">🥇</span><span
          class="sell-price">${this.sellPrice}</span></button>`;

    return htmlTemplate;
  }

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

  buyUpgrade(player, page, button) {
    if (player.totalScore >= this.buyPrice) {
      player.totalScore -= this.buyPrice;
      this.ownedAmount++;
      page.setValuesOnPage(player);
    } else {
      console.log("not enough score to buy");
      shake(button);
    }
  }
}
