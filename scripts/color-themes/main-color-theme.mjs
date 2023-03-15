// TO DO: Make variables private.
// Get methods will be used to take the value.
// Anyone working on the code won't be able to accidentaly change the values.
export class MainTheme {
  constructor() {
    this.textColor = "#eee";
    this.buttonTextColor = "#222";
    this.borderColor = "#eee";
    this.buttonHoverColor = "#ccc";
    this.accentColor = "#eee";
    this.guessedBgColor = "#60b347";
    this.failedBgColor = "#ab263a";
  }

  getTextColor() {
    return this.textColor;
  }

  getButtonTextColor() {
    return this.buttonTextColor;
  }

  getBorderColor() {
    return this.borderColor;
  }

  getAccentColor() {
    return this.accentColor;
  }

  getButtonHoverColor() {
    return this.buttonHoverColor;
  }

  getGuessedBgColor() {
    return this.guessedBgColor;
  }

  getFailedBgColor() {
    return this.failedBgColor;
  }
}
