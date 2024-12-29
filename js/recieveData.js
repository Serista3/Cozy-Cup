/////////////////////////////////////////////////////

// Fetch data from json
export const receiveDataFromJson = async function () {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

/////////////////////////////////////////////////////
