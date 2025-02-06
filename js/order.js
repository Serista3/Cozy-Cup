import * as data from "../js/recieveData.js";

/////////////////////////////////////////////////////

// Selecting elements
const orderTbody = document.querySelector(".order__tbody");
const orderTfoot = document.querySelector(".order__tfoot");
const finalPriceEl = orderTfoot.firstElementChild.querySelector(
  ".order__heading-final"
);
const orderDel = document.querySelector(".order__heading-del");
const delPopup = document.querySelector(".del-popup");
const del = delPopup.querySelector(".del");
const btnYes = document.querySelector(".btn--yes");
const btnNo = document.querySelector(".btn--no");

/////////////////////////////////////////////////////

// Order final price
let orderFinalPrice = 0;

/////////////////////////////////////////////////////

// Add data to older table
const addDataToOrderTable = function () {
  // get data from local
  const dataOrder = data.getDataFromLocal("orderData");
  // const dataRecomOrder = data.getDataFromLocal("orderRecomData");

  // check if data not empty
  if (dataOrder) {
    dataOrder.forEach((d) => {
      orderFinalPrice += Number.parseFloat(d.finalPrice);
      const html = `
            <tr class="order__row">
              <td class="order__data">${d.formatDate}</td>
              <td class="order__data">
                <img
                  src=${d.image}
                  alt="order-image-product"
                  width="100"
                  class="order__img"
                />
              </td>
              <td class="order__data">${d.name}</td>
              <td class="order__data">${d.amount}</td>
              <td class="order__data">${d.finalPrice} BAHT</td>
              <td class="order__data"><svg class="icon-del" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fa0000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></td>
            </tr>`;
      orderTbody.insertAdjacentHTML("afterbegin", html);
    });
  }

  // set final price
  finalPriceEl.textContent = `${orderFinalPrice.toFixed(2)} BAHT`;
};

/////////////////////////////////////////////////////

// Delete order
const showOrderPopup = function (e) {
  if (!e.target.classList.contains("order__heading-del")) return;

  // show del-popup
  delPopup.classList.add("show-popup");
  del.classList.add("show-content-popup");

  delPopup
    .querySelector(".btn--close-pop")
    .addEventListener("click", hiddenDelPopup);

  btnNo.addEventListener("click", hiddenDelPopup);
  btnYes.addEventListener("click", delAllOrder);
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

const delOrder = function (e) {
  // selecting elements
  const curEl = e.target.closest(".icon-del");
  const parentEl = curEl.parentNode.parentNode;
  const nameEl = parentEl.querySelector(
    ".order__data:nth-child(3)"
  ).textContent;
  const priceEl = parentEl.querySelector(".order__data:nth-child(5)");
  const price = Number(priceEl.textContent.split(" ")[0]);

  if (!curEl) return;

  // fetch data
  let receiveData = [];
  const info = data.getDataFromLocal("orderData");
  info.forEach((i) => {
    if (i.name !== nameEl) {
      receiveData.push(i);
    }
  });

  // remove item from table
  orderTbody.removeChild(parentEl);

  // update final price
  orderFinalPrice -= price;
  finalPriceEl.textContent = `${orderFinalPrice.toFixed(2)} BAHT`;

  // clear local storage
  if (receiveData.length === 0) {
    data.clearDataFromLocal();
    return;
  }

  // update to local storage
  data.setDataToLocal("orderData", receiveData);
};

const delAllOrder = function () {
  // remove all child element
  orderTbody.innerHTML = "";

  // set final price = 0
  orderFinalPrice = 0;
  finalPriceEl.textContent = `${orderFinalPrice.toFixed(2)} BAHT`;

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
  const rowEl = orderTfoot.querySelector("tr");
  if (
    screen <= 600 &&
    !rowEl.firstElementChild.classList.contains("order__heading-empty")
  ) {
    // add empty data to row
    const html = `<th class="order__heading-empty" colspan="2">final price</th>`;
    rowEl.insertAdjacentHTML("afterbegin", html);
    return;
  }

  if (
    screen >= 600 &&
    rowEl.firstElementChild.classList.contains("order__heading-empty")
  ) {
    rowEl.removeChild(rowEl.firstChild);
    return;
  }
};

/////////////////////////////////////////////////////

// Intitial
const intitial = function () {
  addEmptyData();
  addDataToOrderTable();
  document.querySelector(".order__tbody").addEventListener("click", delOrder);
  orderDel.addEventListener("click", showOrderPopup);
  delPopup.addEventListener("click", hiddenDelPopup);
  window.addEventListener("resize", addEmptyData);
};

/////////////////////////////////////////////////////

// Start program
intitial();

/////////////////////////////////////////////////////
