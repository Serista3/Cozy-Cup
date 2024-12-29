import * as data from "../js/recieveData.js";

/////////////////////////////////////////////////////

// Selecting elements
const recomContent = document.querySelector(".menu__content");
const popup = document.querySelector(".popup-buy");
const popupContent = document.querySelector(".popup-buy__content");

/////////////////////////////////////////////////////

// popup
const createPopup = async function (e) {
  const parentNode = e.target.parentNode;
  const parentSibling = parentNode.previousSibling;
  const html = `
  <div class="btn--close-pop">X</div>
    <div class="popup-buy__header">
        <div class="popup-buy__box-img">
            <img
                src=${parentSibling.firstChild.src}
                alt=${parentSibling.firstChild.alt}
                class="popup-buy__img"
            />
        </div>
        <div class="popup-buy__detail">
        <h2 class="heading-tertiary">${
          parentNode.querySelector(".heading-tertiary").textContent
        }</h2>
        <p class="paragraph">
        ${parentNode.querySelector(".paragraph").textContent}
        </p>
        <div class="popup-buy__price">${
          parentNode.querySelector(".menu__price").textContent
        }</div>
        </div>
    </div>
    <div class="popup-buy__body">
        <input
        type="number"
        class="popup-buy__amount"
        placeholder="amount"
        required
        />
        <button class="btn btn--confirm">Confirm</button>
    </div>`;

  // check if has popup aleady
  if (popupContent.firstChild) {
    popupContent.innerHTML = html;
  } else {
    popupContent.insertAdjacentHTML("afterbegin", html);
  }

  // add class to show popup
  popup.classList.add("show-popup");
  popupContent.classList.add("show-content-popup");

  // addevent to close popup
  addEventClickBtnClose(document.querySelector(".btn--close-pop"));
  addEventClickPopupClose(popup);
};

const hiddenPopup = function (e) {
  popup.classList.remove("show-popup");
  popupContent.classList.remove("show-content-popup");
};

const hiddenPopupByClick = function (e) {
  if (!e.target.classList.contains("popup-buy")) return;
  e.target.classList.remove("show-popup");
  e.target
    .querySelector(".popup-buy__content")
    .classList.remove("show-content-popup");
};

/////////////////////////////////////////////////////

// Addeventlistener
const addEventClickBtnBuy = function (e) {
  e.addEventListener("click", createPopup);
};

const addEventClickBtnClose = function (e) {
  e.addEventListener("click", hiddenPopup);
};

const addEventClickPopupClose = function (e) {
  e.addEventListener("click", hiddenPopupByClick);
};

/////////////////////////////////////////////////////

// Create all elements
const createAllEl = function () {
  setDataRecomEl(recomContent);
};

/////////////////////////////////////////////////////

// Create elements recommend menu
const setDataRecomEl = async function (parentNode) {
  // receive data
  const dataJson = await data.receiveDataFromJson();

  // set data
  dataJson.products.forEach((p) => {
    const objectEl = createRecomEl(parentNode);
    objectEl.recomImg.setAttribute("src", `${p.items[0].img}`);
    objectEl.recomImg.setAttribute("alt", `menu-img`);
    objectEl.heading3.textContent = p.items[0].name;
    objectEl.recomPrices.textContent = `${p.items[0].price} bath`;
    objectEl.paragraph.textContent = p.items[0].description;
    objectEl.btnBuy.textContent = "buy";

    // addeventlistener
    addEventClickBtnBuy(objectEl.btnBuy);
  });
};

const createRecomEl = function (parentNode) {
  // create elements
  const recomBox = document.createElement("div");
  const recomBoxImg = document.createElement("div");
  const recomImg = document.createElement("img");
  const recomDetail = document.createElement("div");
  const heading3 = document.createElement("h3");
  const recomPrices = document.createElement("div");
  const paragraph = document.createElement("p");
  const btnBuy = document.createElement("button");

  // set class to elements
  recomBox.classList.add("menu__box");
  recomBoxImg.classList.add("menu__box-img");
  recomImg.classList.add("menu__img");
  recomDetail.classList.add("menu__detail");
  heading3.classList.add("heading-tertiary");
  recomPrices.classList.add("menu__price");
  paragraph.classList.add("paragraph");
  btnBuy.classList.add("btn");
  btnBuy.classList.add("btn--buy");

  // append child node
  recomBox.appendChild(recomBoxImg);
  recomBoxImg.appendChild(recomImg);
  recomBox.appendChild(recomDetail);
  recomDetail.appendChild(heading3);
  recomDetail.appendChild(recomPrices);
  recomDetail.appendChild(paragraph);
  recomDetail.appendChild(btnBuy);

  // append parent node
  parentNode.appendChild(recomBox);
  return {
    recomBox,
    recomBoxImg,
    recomImg,
    recomDetail,
    heading3,
    recomPrices,
    paragraph,
    btnBuy,
  };
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
