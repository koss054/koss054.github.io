// Set root var value:
// root.style.setProperty("--failed-background-color", "purple");

export class Root {
  #varMainDarkColor = "--main-dark-color";
  #varGuessedBgColor = "--guessed-background-color";
  #varFailedBgColor = "--failed-background-color";

  #bodyElement = document.querySelector("body");

  constructor() {
    this.root = document.querySelector(":root");
    this.rootStyle = getComputedStyle(this.root);
  }

  showInitialBackgroundColor() {
    const initialBgColor = this.rootStyle.getPropertyValue(
      this.#varMainDarkColor
    );
    this.#bodyElement.style.background = initialBgColor;
  }

  showGuessedBackgroundColor() {
    const guessedBgColor = this.rootStyle.getPropertyValue(
      this.#varGuessedBgColor
    );
    this.#bodyElement.style.background = guessedBgColor;
  }

  showFaileddBackgroundColor() {
    const faiedBgColor = this.rootStyle.getPropertyValue(
      this.#varFailedBgColor
    );
    this.#bodyElement.style.background = faiedBgColor;
  }
}
