var mongoose = require("mongoose");
var LastMileSchema = new mongoose.Schema({
    eol_id: {
      required: true,
      type: String,
    },
    eol_info: {
      type: Object,
      required: true,
      properties: {
        first_name: {
          type: String,
          required: true,
        },
        last_name: {
          type: String,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
        age: {
          type: String,
          required: true,
        },
        contact_number: {
          type: String,
        },
        contact_address: {
          type: Object,
          properties: {
            firstLine: {
              required: true,
              type: String,
            },
            secondLine: {
              required: true,
              type: String,
            },
            district: {
              required: true,
              type: String,
            },
            state: {
              required: true,
              type: String,
            },
            country: {
              required: true,
              type: String,
            },
            landmark: {
              required: true,
              type: String,
            },
            zipcode: {
              required: true,
              type: String,
            },
          },
        },
        idProof: {
          type: Object,
          properties: {
            idType: {
              required: true,
              type: String
            },
            idNo: {
              required: true,
              type: String,
            },
          },
        },
      },
    },
    productAdministeredInfo: {
      required: true,
      type: Array,
      items: {
        type: Object,
        properties: {
          dose: {
            required: true,
            type: String,
          },
          productId: {
            required: true,
            type: String,
          },
          productName: {
            required: true,
            type: String,
          },
          productMfg: {
            required: true,
            type: String,
          },
          productBatchNo: {
            required: true,
            type: String,
          },
          locationInfo: {
            type: Object,
            required: true,
            properties: {
              warehouseId: {
                type: String,
                required: true,
              },
              warehouseTitle: {
                type: String,
                required: true,
              },
            },
          },
          labelId: {
            type: String,
            required: true,
          },
          atomId: {
            type: String,
            required: true,
          },
          administeredData: {
            type: String,
            required: true,
          },
          administeredBy: {
            type: String,
            required: true,
          },
        },
      },
    },
  });
module.exports = mongoose.model("lastmile", LastMileSchema);
