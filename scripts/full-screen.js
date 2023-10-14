const fullscreenButton = document.getElementById("fullscreen-button");
const catalogContainer = document.getElementById("catalog-container");
const buttonsContainer = document.getElementById("buttons-container");
const appElement = document.getElementById("app");

const catalogContainerStyle = catalogContainer.style;
const buttonsContainerStyle = buttonsContainer.style;

let activeFullscreen = false;

const enterFullscreenHandler = () => {
  activeFullscreen = true;
  fullscreenButton.src = "./icons/exit-fullscreen-icon.svg";

  // Style changes
  buttonsContainer.style.position = "fixed";
  buttonsContainer.style.bottom = 0;
  buttonsContainer.style.right = "1rem";

  catalogContainer.style.maxHeight = "100%";
  catalogContainer.style.overflow = "visible";

  appElement.style.padding = 0;

  // Hide elements
  document.querySelector("header").style.display = "none";
  document.getElementById("add-banner-accordion").style.display = "none";
};

const exitFullscreenHandler = () => {
  activeFullscreen = false;
  fullscreenButton.src = "./icons/enter-fullscreen-icon.svg";

  // Style changes
  catalogContainer.style = catalogContainerStyle;
  buttonsContainer.style = buttonsContainerStyle;
  appElement.style.padding = "1rem 1.5rem 4rem 1.5rem";

  // Show elements
  document.querySelector("header").style.display = "block";
  document.getElementById("add-banner-accordion").style.display = "flex";
};

fullscreenButton.onclick = () => {
  if (activeFullscreen) exitFullscreenHandler();
  else enterFullscreenHandler();
  window.scrollTo(0, 0);
};
