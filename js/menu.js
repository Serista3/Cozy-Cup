import * as data from "../js/recieveData.js";
import * as reuse from "../js/reuse.js";

/////////////////////////////////////////////////////

// Selecting elements
const coffee = document.querySelector(".coffee");
const tea = document.querySelector(".tea");
const dessert = document.querySelector(".dessert");

/////////////////////////////////////////////////////

// Addeventlistener
const addEventClickBtnView = function (e) {
  e.addEventListener("click", reuse.viewMenuDetail);
}

const addEventClickBtnClose = function (e) {
  e.addEventListener("click", reuse.hiddenMenuDetail);
}

const addEventClickBtnBuy = function (e) {
  e.addEventListener("click", reuse.createPopup);
};

/////////////////////////////////////////////////////

// Create all elements
const createAllEl = function () {
  setDataMenuEl(coffee, "Coffee");
  setDataMenuEl(tea, "Tea");
  setDataMenuEl(dessert, "Desserts");
};

/////////////////////////////////////////////////////

// Set data to menu
const setDataMenuEl = async function (parentNode, want) {
  // receive data
  const dataJson = await data.receiveDataFromJson();

  // set data
  dataJson.products.forEach((p) => {
    if (p.category === want) {
      p.items.forEach((i) => {
        const objectEl = reuse.createMenu(parentNode);
        objectEl.recomImg.setAttribute("src", `${i.img}`);
        objectEl.recomImg.setAttribute("alt", `menu-img`);
        objectEl.recomBtnView.textContent = "view";
        objectEl.additHeading.textContent = i.name;
        objectEl.heading3.textContent = i.name;
        objectEl.recomPrices.textContent = `${i.price} baht`;
        objectEl.paragraph.textContent = i.description;
        objectEl.btnBuy.textContent = "buy";
        objectEl.btnClose.textContent = "×";

        // addeventlistener
        addEventClickBtnView(objectEl.recomBtnView);
        addEventClickBtnClose(objectEl.btnClose);
        addEventClickBtnBuy(objectEl.btnBuy);
      });
      return;
    }
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
