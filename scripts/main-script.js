if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/creador-de-catalogos/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}


const openFiles = document.getElementById("open-files");
const productsGrid = document.getElementById("products-grid");

document.getElementById("add-items-button").onclick = () => {
  openFiles.click();
};

// NOTA: CAMBIAR TAMAÑO DE CANVAS A LA HORA DE GUARDARLO, PARA MAYOR RESOLUCIÓN (COMO CUANDO SE GUARDA EN PC).

function addImageToGrid(imageURL) {
  let image = document.createElement("div");
  image.style.background = `url(${imageURL})`;
  image.style.backgroundSize = "cover";
  image.style.backgroundPosition = "center";
  productsGrid.appendChild(image);
}

openFiles.onchange = (event) => {
  let files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    addImageToGrid(URL.createObjectURL(files[i]));
  }
};

document.getElementById("download-catalog-button").onclick = () => {
  const catalog = document.getElementById("catalog");

  /* catalog.style.width = window.innerWidth * 1.5 + "px" */

  htmlToImage
    .toPng(catalog)
    .then(function (dataUrl) {
      const createEl = document.createElement("a");
      createEl.href = dataUrl;
      createEl.download = new Date().getTime();
      createEl.click();
      createEl.remove();
      /* catalog.style.width = "100%"; */
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

const productsElements = document.getElementById("products-grid").children;

for (let i = 0; i < productsElements.length; i++) {
  productsElements[i].onclick = () =>
    (productsElements[i].style.transform = "scale(1.25)");
}
