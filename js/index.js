import * as data from "../js/recieveData.js";
import * as reuse from "../js/reuse.js";

/////////////////////////////////////////////////////

// Selecting elements
const recomContent = document.querySelector(".menu__content");

/////////////////////////////////////////////////////

// Addeventlistener
const addEventClickBtnBuy = function (e) {
  e.addEventListener("click", reuse.createPopup);
};

/////////////////////////////////////////////////////

// Create all elements
const createAllEl = function () {
  setDataRecomEl(recomContent);
};

/////////////////////////////////////////////////////

// Set data to menu
const setDataRecomEl = async function (parentNode) {
  // receive data
  const dataJson = await data.receiveDataFromJson();

  // set data
  dataJson.products.forEach((p) => {
    const objectEl = reuse.createMenu(parentNode);
    objectEl.recomImg.setAttribute("src", `${p.items[0].img}`);
    objectEl.recomImg.setAttribute("alt", `menu-img`);
    objectEl.additHeading.textContent = p.items[0].name;
    objectEl.heading3.textContent = p.items[0].name;
    objectEl.recomPrices.textContent = `${p.items[0].price} baht`;
    objectEl.paragraph.textContent = p.items[0].description;
    objectEl.btnBuy.textContent = "buy";

    // addeventlistener
    addEventClickBtnBuy(objectEl.btnBuy);
  });
};

/////////////////////////////////////////////////////

// Intitial
const intitial = function () {
  createAllEl();
};

/////////////////////////////////////////////////////

// Start program
intitial();

/////////////////////////////////////////////////////
