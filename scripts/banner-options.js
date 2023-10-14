const accordionHeader = document.getElementById("add-banner-accordion")
  .children[0];
const accordionBody = document.getElementById("add-banner-body");
const expandIcon = accordionHeader.children[1];

let showAccordionBody = false;

accordionHeader.onclick = () => {
  if (showAccordionBody) {
    showAccordionBody = false;
    accordionBody.style.display = "none";
    expandIcon.style.transform = "none";
    accordionHeader.style.borderRadius = "32px";
    return;
  }

  showAccordionBody = true;
  accordionBody.style.display = "block";
  expandIcon.style.transform = "rotate(180deg)";
  accordionHeader.style.borderRadius = "32px 32px 0 0";
};

let showBanner = false;
const banner = document.createElement("img");
banner.id = "catalog-banner"
const selectBannerInput = document.getElementById("select-banner");
const showBannerCheckbox = document.getElementById("show-banner-checkbox");

showBannerCheckbox.onchange = () => {
  if (showBanner) {
    document.getElementById("catalog").removeChild(banner);
    showBanner = false;
    showBannerCheckbox.checked = false;
    return;
  }

  banner.style.display = "block";
  document.getElementById("catalog").prepend(banner);
  showBanner = true;
  showBannerCheckbox.checked = true;

  if (!banner.src) selectBannerInput.click();
};

selectBannerInput.onchange = (event) => {
  let file = event.target.files[0];
  if (file) {
    banner.src = URL.createObjectURL(file);
  }
};
