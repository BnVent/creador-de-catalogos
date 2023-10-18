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

const addPriceFeatureToImage = (image) => {
  const priceElement = document.createElement("input");

  image.onclick = () => {
    if (image.children.length === 0) {
      priceElement.setAttribute("type", "text");
      priceElement.className = "price-element";
      image.appendChild(priceElement);
      priceElement.focus();
    }
  };

  priceElement.onblur = () => {
    if (priceElement.value == "") {
      image.removeChild(priceElement);
    }
  };
};

function addImageToGrid(imageURL) {
  let image = document.createElement("div");
  image.style.background = `url(${imageURL})`;
  image.style.backgroundSize = "cover";
  image.style.backgroundPosition = "center";
  addPriceFeatureToImage(image);
  productsGrid.removeChild(addItemsCard);
  productsGrid.appendChild(image);
  productsGrid.appendChild(addItemsCard);
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
