// Set root var value:
// root.style.setProperty("--failed-background-color", "purple");
import { MainTheme } from "./main-color-theme.mjs";
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

  // TO DO: Figure out how to make interfaces, and have only one method for switching themes.
  // e.g. applyTheme(ITheme theme)
  applyMainTheme() {
    const mainTheme = new MainTheme();

    this.root.style.setProperty(this.#varTextColor, mainTheme.textColor);
    this.root.style.setProperty(this.#varAccentColor, mainTheme.accentColor);
    this.root.style.setProperty(this.#varBorderColor, mainTheme.borderColor);

    this.root.style.setProperty(
      this.#varButtonTextColor,
      mainTheme.buttonTextColor
    );

    this.root.style.setProperty(
      this.#varButtonHoverColor,
      mainTheme.buttonHoverColor
    );

    this.root.style.setProperty(
      this.#varGuessedBgColor,
      mainTheme.guessedBgColor
    );

    this.root.style.setProperty(
      this.#varFailedBgColor,
      mainTheme.failedBgColor
    );
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
