const manageGridAccordionHeader = document.getElementById("manage-grid-accordion").children[0];
const manageGridBody = document.getElementById("manage-grid-body");
const productsGrid = document.getElementById("products-grid");
const buttons = manageGridBody.getElementsByClassName("buttons-container")[0].children;
const catalog = document.getElementById("catalog");

const changeActiveButton = (buttonIndex, value) => {
  catalog.style.display = "none";
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = i == buttonIndex ? "active" : null;
  }

  productsGrid.style.gridTemplateColumns = `repeat(${Number(value)}, 1fr)`;

  if(value == 4) productsGrid.className = "minified"
  else productsGrid.className = null

  catalog.style.display = "block";
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => changeActiveButton(i, buttons[i].innerText);
}

manageGridAccordionHeader.onclick = () => {
  manageGridBody.style.display = manageGridBody.style.display == "block" ? "none" : "block";
};
