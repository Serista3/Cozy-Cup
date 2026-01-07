import * as data from "./recieveData.js";

/////////////////////////////////////////////////////

// Selecting elements
const cartTbody = document.querySelector(".cart__tbody");
const cartTfoot = document.querySelector(".cart__tfoot");
const finalPriceEl = cartTfoot.firstElementChild.querySelector(
  ".cart__heading-final"
);
const cartDel = document.querySelector(".cart__heading-del");
const delPopup = document.querySelector(".del-popup");
const del = delPopup.querySelector(".del");
const btnYes = document.querySelector(".btn--yes");
const btnNo = document.querySelector(".btn--no");

/////////////////////////////////////////////////////

// Cart final price
let cartFinalPrice = 0;

/////////////////////////////////////////////////////

// Add data to cart table
const addDataToCartTable = function () {
  // get data from local
  const dataCart = data.getDataFromLocal("cartData");
  // const dataRecomCart = data.getDataFromLocal("cartRecomData");
  // check if data not empty
  if (dataCart) {
    dataCart.forEach((d) => {
      cartFinalPrice += Number.parseFloat(d.finalPrice);
      const html = `
            <tr class="cart__row">
              <td class="cart__data">${d.formatDate}</td>
              <td class="cart__data">
                <img
                  src=${d.image}
                  alt="cart-image-product"
                  width="100"
                  class="cart__img"
                />
              </td>
              <td class="cart__data">${d.name}</td>
              <td class="cart__data">${d.amount}</td>
              <td class="cart__data">${d.finalPrice} BAHT</td>
              <td class="cart__data"><svg class="icon-del" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fa0000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></td>
            </tr>`;
      cartTbody.insertAdjacentHTML("afterbegin", html);
    });
  }

  // set final price
  finalPriceEl.textContent = `${cartFinalPrice.toFixed(2)} BAHT`;
};

/////////////////////////////////////////////////////

// Delete cart
const showCartPopup = function (e) {
  if (!e.target.classList.contains("cart__heading-del")) return;

  // show del-popup
  delPopup.classList.add("show-popup");
  del.classList.add("show-content-popup");

  delPopup
    .querySelector(".btn--close-pop")
    .addEventListener("click", hiddenDelPopup);

  btnNo.addEventListener("click", hiddenDelPopup);
  btnYes.addEventListener("click", delAllCart);
};

const hiddenDelPopup = function (e) {
  if (
    !e.target.classList.contains("del-popup") &&
    !e.target.classList.contains("btn--close-pop") &&
    !e.target.classList.contains("btn--no")
  )
    return;
  delPopup.classList.remove("show-popup");
  del.classList.remove("show-content-popup");
};

const delCart = function (e) {
  // selecting elements
  const curEl = e.target.closest(".icon-del");
  const parentEl = curEl.parentNode.parentNode;
  const nameEl = parentEl.querySelector(
    ".cart__data:nth-child(3)"
  ).textContent;
  const priceEl = parentEl.querySelector(".cart__data:nth-child(5)");
  const price = Number(priceEl.textContent.split(" ")[0]);

  if (!curEl) return;

  // fetch data
  let receiveData = [];
  const info = data.getDataFromLocal("cartData");
  info.forEach((i) => {
    if (i.name !== nameEl) {
      receiveData.push(i);
    }
  });

  // remove item from table
  cartTbody.removeChild(parentEl);

  // update final price
  cartFinalPrice -= price;
  finalPriceEl.textContent = `${cartFinalPrice.toFixed(2)} BAHT`;

  // clear local storage
  if (receiveData.length === 0) {
    data.clearDataFromLocal();
    return;
  }

  // update to local storage
  data.setDataToLocal("cartData", receiveData);
};

const delAllCart = function () {
  // remove all child element
  cartTbody.innerHTML = "";

  // set final price = 0
  cartFinalPrice = 0;
  finalPriceEl.textContent = `${cartFinalPrice.toFixed(2)} BAHT`;

  // clear data storage
  data.clearDataFromLocal();

  // hidden popup
  delPopup.classList.remove("show-popup");
  del.classList.remove("show-content-popup");
};

/////////////////////////////////////////////////////

// Add empty data to row if width <= 600px
const addEmptyData = function () {
  const screen = document.body.getBoundingClientRect().width;
  const rowEl = cartTfoot.querySelector("tr");
  if (
    screen <= 600 &&
    !rowEl.firstElementChild.classList.contains("cart__heading-empty")
  ) {
    // add empty data to row
    const html = `<th class="cart__heading-empty" colspan="2">final price</th>`;
    rowEl.insertAdjacentHTML("afterbegin", html);
    return;
  }

  if (
    screen >= 600 &&
    rowEl.firstElementChild.classList.contains("cart__heading-empty")
  ) {
    rowEl.removeChild(rowEl.firstChild);
    return;
  }
};

/////////////////////////////////////////////////////

// Intitial
const intitial = function () {
  addEmptyData();
  addDataToCartTable();
  document.querySelector(".cart__tbody").addEventListener("click", delCart);
  cartDel.addEventListener("click", showCartPopup);
  delPopup.addEventListener("click", hiddenDelPopup);
  window.addEventListener("resize", addEmptyData);
};

/////////////////////////////////////////////////////

// Start program
intitial();

/////////////////////////////////////////////////////
