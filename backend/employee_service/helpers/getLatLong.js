const axios = require("axios");
const getLatLongByCity = async (param) => {
  try {
    const result = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${param}&apiKey=BCRdhsq4jB8NxBG7vTWpVbNxCb6b50j98_f_bwiy7Qw`
    );
    /* MongoDB location 
      { 
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      }
    */
    return result.data.items.length
      ? {
          type: "Point",
          coordinates: [
            result.data.items[0].position.lat,
            result.data.items[0].position.lng,
          ],
        }
      : { type: "Point", coordinates: [0, 0] };
  } catch (e) {
    console.log(e);
    return { type: "Point", coordinates: [0, 0] };
  }
};

// async function syncWarehouse() {
//   const warehouses = await WarehouseModel.find({});
//   for (const key of warehouses) {
//     console.log(key);
//     const latlog = await getLatLongByCity(
//       key.warehouseAddress?.city + "," + key.warehouseAddress?.country
//     );
//     const res = await WarehouseModel.updateOne(
//       {
//         id: key.id,
//       },
//       {
//         $set: {
//           location: latlog,
//         },
//       }
//     );
//     console.log(res);
//   }
//   console.log("Completed");
// }

module.exports = {
  getLatLongByCity,
};
