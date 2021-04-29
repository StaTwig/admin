var mongoose = require('mongoose');
var LastMileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  eol_id: { type: String, required: true},
  eol_info: { type: Object, required: true, 
    default: {
      first_name: { type: String },
      last_name: { type: String },
      gender: { type: String },
      age: { type: Number },
      contact_number: { type: Number },
      contact_address: { type: Object, 
        default: {
          firstLine: { type: String },
          secondLine: { type: String },
          district: { type: String },
          state: { type: String },
          country: { type: String },
          landmark: { type: String },
          zipcode: { type: Number }
        },
      },
    },
  },
  
  idProof: { type: Object, required: true, 
    default: {
      idType: { type: String },
      idNo: { type: String }
    }
  },

  productAdministeredInfo: { type: Array, required: true,
    default: [
      {
        items: { type: Object, required: true, 
          default: {
            dose: { type: Number },
            productId: { type: String },
            productName: { type: String },
            productMfg: { type: String },
            productBatchNo: { type: String },
            locationInfo: { type: Object, required: true, 
              default: {
                warehouseId: { type: String },
                warehouseTitle: { type: String },
              },
            },
            labelId: { type: String },
            atomId: { type: String },
            administeredData: '2021-03-31T18:30:00.000Z',
            administeredBy: { type: String },
          }
        },
      },
    ],
  }
});
module.exports = mongoose.model('lastmile', LastMileSchema);
