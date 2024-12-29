/////////////////////////////////////////////////////

// Selecting
const popup = document.querySelector(".popup-buy");
const popupContent = document.querySelector(".popup-buy__content");

/////////////////////////////////////////////////////

// popup
export const createPopup = function (e) {
  // find element data
  const parentNode = e.target.parentNode;
  const parentSibling = parentNode.previousSibling;

  // insert data to new code html
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

  // insert html code to popupContent
  popupContent.innerHTML = html;

  // add class to show popup
  popup.classList.add("show-popup");
  popupContent.classList.add("show-content-popup");

  // addevent to close popup
  addEventClickBtnClose(document.querySelector(".btn--close-pop"));
  addEventClickPopupClose(popup);
};

const hiddenPopup = function () {
  // remove class show
  popup.classList.remove("show-popup");
  popupContent.classList.remove("show-content-popup");
};

const hiddenPopupByClick = function (e) {
  // check if click element by class popup-buy
  if (!e.target.classList.contains("popup-buy")) return;

  // remove class show
  e.target.classList.remove("show-popup");
  e.target
    .querySelector(".popup-buy__content")
    .classList.remove("show-content-popup");
};

/////////////////////////////////////////////////////

// Addeventlistener
const addEventClickBtnClose = function (e) {
  e.addEventListener("click", hiddenPopup);
};

const addEventClickPopupClose = function (e) {
  e.addEventListener("click", hiddenPopupByClick);
};

/////////////////////////////////////////////////////

// Create elements
export const createMenu = function (parentNode) {
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

  // return elements
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
