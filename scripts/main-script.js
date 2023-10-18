if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/creador-de-catalogos/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

const openFiles = document.getElementById("open-files");
const productsGrid = document.getElementById("products-grid");
const addItemsCard = document.getElementById("add-item-card");
const addItemsButton = document.getElementById("add-item-button");
const catalog = document.getElementById("catalog");

addItemsButton.onclick = () => {
  openFiles.click();
};

addItemsCard.onclick = () => {
  openFiles.click();
};

const addPriceFeatureToImage = (figure) => {
  const figCaption = figure.children[1];

  figure.onclick = () => {
    figCaption.style.display = "block";
    figCaption.focus();
  };

  figCaption.onblur = () => {
    if (figCaption.innerText == "") {
      figCaption.style.display = "none";
    }
  };
};

function addImageToGrid(imageURL) {
  catalog.style.display = "none";

  let figure = document.createElement("figure");
  let figCaption = document.createElement("figcaption");
  let image = document.createElement("img");

  figCaption.contentEditable = true;

  figure.appendChild(image);
  figure.appendChild(figCaption);

  image.style.background = `#dbdbdb`;
  image.src = imageURL;
  image.loading = "lazy";

  addPriceFeatureToImage(figure);
  productsGrid.removeChild(addItemsCard);
  productsGrid.appendChild(figure);
  productsGrid.appendChild(addItemsCard);
  catalog.style.display = "block";
}

openFiles.onchange = (event) => {
  let files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    addImageToGrid(URL.createObjectURL(files[i]));
  }
};

document.getElementById("download-button").onclick = () => {
  /* catalog.style.width = window.innerWidth * 1.5 + "px" */

  productsGrid.removeChild(addItemsCard);

  catalog.style.display = "none";

  const saveCatalog = new Promise((resolve, reject) => {
    document.getElementById("loading-screen").style.display = "block";
    catalog.style.display = "block";
    htmlToImage
      .toPng(catalog)
      .then(function (dataUrl) {
        const createEl = document.createElement("a");
        createEl.href = dataUrl;
        createEl.download = new Date().getTime();
        createEl.click();
        createEl.remove();
        productsGrid.appendChild(addItemsCard);
        /* catalog.style.width = "100%"; */
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
        reject(error);
      })
      .finally(() => {
        document.getElementById("loading-screen").style.display = "none";
      });
  });

  saveCatalog();
};
