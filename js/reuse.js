import * as data from "../js/recieveData.js";

/////////////////////////////////////////////////////

// Selecting
const popup = document.querySelector(".popup-add-cart");
const popupContent = document.querySelector(".popup-add-cart__content");
const noti = document.querySelector(".noti");

/////////////////////////////////////////////////////

// popup
export const createPopup = function (e) {
  // find element data
  const parentNode = e.target.parentNode;
  const parentSibling = parentNode;

  // insert data to new code html
  const html = `
    <div class="btn--close-pop">X</div>
    <div class="popup-add-cart__header">
        <div class="popup-add-cart__box-img">
            <img
                src=${parentSibling.firstChild.src}
                alt=${parentSibling.firstChild.alt}
                class="popup-add-cart__img"
            />
        </div>
        <div class="popup-add-cart__detail">
            <h3 class="heading-tertiary">${
              parentNode.parentNode.querySelector(".heading-tertiary").textContent
            }</h3>
            <p class="paragraph">
            ${parentNode.parentNode.querySelector(".paragraph").textContent}
            </p>
            
            <div class="popup-add-cart__body">
                <input
                type="number"
                class="popup-add-cart__amount"
                placeholder="amount"
                min="1"
                max="100000"
                required
                />
                <div class="popup-add-cart__price">${
                  parentNode.parentNode.querySelector(".menu__price").textContent
                }</div>
            </div>
            <button class="btn btn--confirm">Add To Cart</button
        </div>
    </div>`;

  // insert html code to popupContent
  popupContent.innerHTML = html;

  // add class to show popup
  popup.classList.add("show-popup");
  popupContent.classList.add("show-content-popup");

  // addevent to close popup
  addEventClickBtnClose(document.querySelector(".btn--close-pop"));
  addEventClickPopupClose(popup);

  // if press confirm
  addEventClickConfirm(document.querySelector(".btn--confirm"));
};

const hiddenPopup = function () {
  // remove class show
  popup.classList.remove("show-popup");
  popupContent.classList.remove("show-content-popup");
};

const hiddenPopupByClick = function (e) {
  // check if click element by class popup-add-cart
  if (!e.target.classList.contains("popup-add-cart")) return;

  // remove class show
  e.target.classList.remove("show-popup");
  e.target
    .querySelector(".popup-add-cart__content")
    .classList.remove("show-content-popup");
};

/////////////////////////////////////////////////////

// Notification
const showNotification = function () {
  // create current node
  const div = document.createElement("div");
  const textNode = document.createTextNode(
    "Item added to cart successfully."
  );

  // add class to current node
  div.classList.add("noti__content");

  // add child to parent node
  div.appendChild(textNode);
  noti.prepend(div);

  // show noti
  setTimeout(() => {
    div.classList.add("show-noti");
  }, 500);

  // hidden noti
  setTimeout(() => {
    div.classList.remove("show-noti");
  }, 2500);

  // remove childe node noti
  setTimeout(() => {
    noti.removeChild(div);
  }, 3000);
};

/////////////////////////////////////////////////////

// Store data from cart popup
const storeDataCart = function (e) {
  // find elements
  const parentEl = e.target.parentNode;
  const nameProduct = parentEl.querySelector(".heading-tertiary");
  const imgProduct =
    parentEl.previousElementSibling.querySelector(".popup-add-cart__img");
  const popupBody = parentEl.querySelector(".popup-add-cart__body");
  const amountProduct = popupBody.querySelector(".popup-add-cart__amount");
  const price = popupBody.querySelector(".popup-add-cart__price");

  // calc data
  const date = new Date();
  const formatDate = `${date.getDay().toString().padStart(2, "0")}/${date
    .getMonth()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
  const name = nameProduct.textContent;
  const image = imgProduct.src;
  const amount = amountProduct.value;
  let finalPrice = Number(
    Number.parseInt(amount) * Number.parseFloat(price.textContent)
  ).toFixed(2);

  // check if input === ""
  if (amount === "") finalPrice = 0;

  // store data
  if (
    Number.parseInt(amount) &&
    Number.parseInt(amount) > 0 &&
    Number.parseFloat(amount) % 1 === 0
  ) {
    // hidden popup
    document
      .querySelector(".popup-add-cart__content")
      .classList.remove("show-content-popup");
    document.querySelector(".popup-add-cart").classList.remove("show-popup");

    // check if list product is empty
    const receiveCartData = data.getDataFromLocal("cartData");
    if (data.cartProducts.length === 0 && receiveCartData) {
      receiveCartData.forEach((r) => {
        data.cartProducts.push(r);
      });
    }

    // push data to list
    data.cartProducts.push({
      formatDate,
      image,
      name,
      amount: Number.parseInt(amount).toString(),
      finalPrice,
    });

    // set data to local
    data.setDataToLocal("cartData", data.cartProducts);

    // show noti
    showNotification();
  }
};

/////////////////////////////////////////////////////

// Show nav responsive
const addEventClickOpenNav = function (e) {
  e.addEventListener("click", openNav);
};

const openNav = function () {
  document.querySelector(".nav-res").classList.add("show-nav-res");
};

const closeNav = function () {
  document.querySelector(".nav-res").classList.remove("show-nav-res");
};

const createNavRes = function () {
  const html = `<div class="nav-res">
                 <ul class="nav-res__list">
                  <li class="nav-res__item"><a href="/index.html" class="nav-res__link">home</a></li>
                  <li class="nav-res__item"><a href="/html/menu.html" class="nav-res__link">menu</a></li>
                  <li class="nav-res__item"><a href="/html/cart.html" class="nav-res__link">cart</a></li>
                 </ul>
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#fff"
                  viewBox="0 0 256 256"
                  class="nav-res__icon-menu"
                  >
                  <path
                    d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                  ></path>
                  </svg>
                </div>`;
  document.body.insertAdjacentHTML("afterbegin", html);
  addEventClickOpenNav(document.querySelector(".nav__item:last-child svg"));
  document
    .querySelector(".nav-res__icon-menu")
    .addEventListener("click", closeNav);
};
createNavRes();

/////////////////////////////////////////////////////

// Addeventlistener
const addEventClickBtnClose = function (e) {
  e.addEventListener("click", hiddenPopup);
};

const addEventClickPopupClose = function (e) {
  e.addEventListener("click", hiddenPopupByClick);
};

const addEventClickConfirm = function (e) {
  e.addEventListener("click", storeDataCart);
};

/////////////////////////////////////////////////////

// Create elements
export const createMenu = function (parentNode) {
  // create elements
  const recomBox = document.createElement("div");
  const recomBoxImg = document.createElement("div");
  const additHeading = document.createElement("h3");
  const recomImg = document.createElement("img");
  const recomDetail = document.createElement("div");
  const heading3 = document.createElement("h3");
  const recomPrices = document.createElement("div");
  const paragraph = document.createElement("p");

  // set class to elements
  recomBox.classList.add("menu__box");
  recomBoxImg.classList.add("menu__box-img");
  additHeading.classList.add("menu__addit");
  recomImg.classList.add("menu__img");
  recomDetail.classList.add("menu__detail");
  heading3.classList.add("heading-tertiary");
  recomPrices.classList.add("menu__price");
  paragraph.classList.add("paragraph");

  // append child node
  recomBox.appendChild(recomBoxImg);
  recomBoxImg.appendChild(recomImg);
  recomBoxImg.appendChild(additHeading);
  recomBox.appendChild(recomDetail);
  recomDetail.appendChild(heading3);
  recomDetail.appendChild(recomPrices);
  recomDetail.appendChild(paragraph);

  // append parent node
  parentNode.appendChild(recomBox);

  // return elements
  return {
    recomBox,
    recomBoxImg,
    additHeading,
    recomImg,
    recomDetail,
    heading3,
    recomPrices,
    paragraph,
  };
};

/////////////////////////////////////////////////////
