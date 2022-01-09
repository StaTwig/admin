const axios = require("axios");
const getLatLongByCity = async (param) => {
  try {
    const result = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${param}&apiKey=BCRdhsq4jB8NxBG7vTWpVbNxCb6b50j98_f_bwiy7Qw`
    );
    return result.data.items.length
      ? {
          latitude: result.data.items[0].position.lat,
          longitude: result.data.items[0].position.lng,
        }
      : { latitude: 0, longitude: 0 };
  } catch (e) {
    return e.response;
  }
};

module.exports = {
  getLatLongByCity,
};
