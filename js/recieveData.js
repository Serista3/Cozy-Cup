/////////////////////////////////////////////////////

// Fetch data from json
export const receiveDataFromJson = async function () {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
};

/////////////////////////////////////////////////////

// Data from cart
export const cartProducts = [];

/////////////////////////////////////////////////////

// Set data to local storage
export const setDataToLocal = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};

/////////////////////////////////////////////////////

// Get data from local storage
export const getDataFromLocal = function (key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

/////////////////////////////////////////////////////

// Clear data from local storage
export const clearDataFromLocal = function () {
  localStorage.clear();
};
// clearDataFromLocal();

/////////////////////////////////////////////////////
