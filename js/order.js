import * as data from "../js/recieveData.js";

/////////////////////////////////////////////////////

// Selecting elements
const orderTbody = document.querySelector(".order__tbody");
const orderTfoot = document.querySelector(".order__tfoot");

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
            </tr>`;
      orderTbody.insertAdjacentHTML("afterbegin", html);
    });
  }

  // set final price
  const finalPriceEl = orderTfoot.firstElementChild.querySelector(
    ".order__heading:last-child"
  );
  finalPriceEl.textContent = `${orderFinalPrice.toFixed(2)} BATH`;
};

/////////////////////////////////////////////////////

// Intitial
const intitial = function () {
  addDataToOrderTable();
};

/////////////////////////////////////////////////////

// Start program
intitial();

/////////////////////////////////////////////////////
