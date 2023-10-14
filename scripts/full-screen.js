const fullscreenButton = document.getElementById("fullscreen-button");
const catalogContainer = document.getElementById("catalog-container");

let enabledFullscreen = false;

const enterFullscreenHandler = () => {
  enabledFullscreen = true;
  catalogContainer.requestFullscreen();
  fullscreenButton.src = "/icons/exit-fullscreen-icon.svg";
};

const exitFullscreenHandler = () => {
  enabledFullscreen = false;
  document.exitFullscreen();
  fullscreenButton.src = "/icons/enter-fullscreen-icon.svg";
  return;
};

document.onfullscreenchange = () => {
  if (!window.document.fullscreenElement) exitFullscreenHandler();
};

fullscreenButton.onclick = () => {
  if (enabledFullscreen) exitFullscreenHandler;
  else enterFullscreenHandler();
};
