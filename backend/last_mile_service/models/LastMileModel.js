var mongoose = require("mongoose");
var LastMileSchema = new mongoose.Schema({
  properties: {
    eol_id: {
      required: true,
      type: string,
    },
    eol_info: {
      type: object,
      required: true,
      properties: {
        first_name: {
          type: string,
          required: true,
        },
        last_name: {
          type: string,
          required: true,
        },
        gender: {
          type: string,
          required: true,
        },
        age: {
          type: number,
          required: true,
        },
        contact_number: {
          type: number,
        },
        contact_address: {
          type: object,
          properties: {
            firstLine: {
              required: true,
              type: string,
            },
            secondLine: {
              required: true,
              type: string,
            },
            district: {
              required: true,
              type: string,
            },
            state: {
              required: true,
              type: string,
            },
            country: {
              required: true,
              type: string,
            },
            landmark: {
              required: true,
              type: string,
            },
            zipcode: {
              required: true,
              type: number,
            },
          },
        },
        idProof: {
          type: object,
          properties: {
            idType: {
              required: true,
              type: string
            },
            idNo: {
              required: true,
              type: string,
            },
          },
          required: [idType, idNo],
        },
      },
    },
    productAdministeredInfo: {
      required: true,
      type: array,
      items: {
        type: object,
        properties: {
          dose: {
            required: true,
            type: string,
          },
          productId: {
            required: true,
            type: string,
          },
          productName: {
            required: true,
            type: string,
          },
          productMfg: {
            required: true,
            type: string,
          },
          productBatchNo: {
            required: true,
            type: string,
          },
          locationInfo: {
            type: object,
            required: true,
            properties: {
              warehouseId: {
                type: string,
                required: true,
              },
              warehouseTitle: {
                type: string,
                required: true,
              },
            },
          },
          labelId: {
            type: string,
            required: true,
          },
          atomId: {
            type: string,
            required: true,
          },
          administeredData: {
            type: string,
            required: true,
          },
          administeredBy: {
            type: string,
            required: true,
          },
        },
      },
    },
  },
});
module.exports = mongoose.model("lastmile", LastMileSchema);
