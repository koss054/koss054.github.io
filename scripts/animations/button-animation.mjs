export function shake(buttonElement, interval = 100) {
  buttonElement.classList.add("shaking");
  buttonElement.style.transition = "all " + (interval / 100).toString() + "s";
  setTimeout(() => {
    buttonElement.style.transform = "translateX(-25%)";
  }, interval * 0);
  setTimeout(() => {
    buttonElement.style.transform = "translateX(25%)";
  }, interval * 1);
  setTimeout(() => {
    buttonElement.style.transform = "translateX(-10%)";
  }, interval * 2);
  setTimeout(() => {
    buttonElement.style.transform = "translateX(10%)";
  }, interval * 3);
  setTimeout(() => {
    buttonElement.style.transform = "translateX(-5%)";
  }, interval * 4);
  setTimeout(() => {
    buttonElement.style.transform = "translateX(0%)";
  }, interval * 5);
  buttonElement.classList.remove("shaking");
}
