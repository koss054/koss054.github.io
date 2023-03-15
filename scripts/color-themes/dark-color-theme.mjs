// TO DO: Make variables private.
// Get methods will be used to take the value.
// Anyone working on the code won't be able to accidentaly change the values.
export class DarkTheme {
  constructor() {
    this.textColor = "#eee";
    this.buttonTextColor = "#eee";
    this.borderColor = "rgb(61, 66, 68)";
    this.buttonHoverColor = "rgb(61, 66, 68)";
    this.accentColor = "rgb(39, 41, 44)";
    this.guessedBgColor = "rgb(71 135 53)";
    this.failedBgColor = "rgb(142 16 35)";
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
