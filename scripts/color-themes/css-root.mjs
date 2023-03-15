// Set root var value:
// root.style.setProperty("--failed-background-color", "purple");
import { DarkTheme } from "./dark-color-theme.mjs";

export class Root {
  #varTextColor = "--text-color";
  #varAccentColor = "--accent-color";
  #varBorderColor = "--border-color";
  #varMainDarkColor = "--main-dark-color";
  #varButtonTextColor = "--button-text-color";
  #varButtonHoverColor = "--button-hover-color";
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

  applyDarkTheme() {
    const darkTheme = new DarkTheme();

    this.root.style.setProperty(this.#varTextColor, darkTheme.textColor);
    this.root.style.setProperty(this.#varAccentColor, darkTheme.accentColor);
    this.root.style.setProperty(this.#varBorderColor, darkTheme.borderColor);

    this.root.style.setProperty(
      this.#varButtonTextColor,
      darkTheme.buttonTextColor
    );

    this.root.style.setProperty(
      this.#varButtonHoverColor,
      darkTheme.buttonHoverColor
    );

    this.root.style.setProperty(
      this.#varGuessedBgColor,
      darkTheme.guessedBgColor
    );

    this.root.style.setProperty(
      this.#varFailedBgColor,
      darkTheme.failedBgColor
    );
  }
}
