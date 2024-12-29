/////////////////////////////////////////////////////

// Fetch data from json
export const receiveDataFromJson = async function () {
  const response = await fetch("../data.json");
  const data = await response.json();
  return data;
};

/////////////////////////////////////////////////////
