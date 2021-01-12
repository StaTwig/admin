const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    inventory_id: {
      type: String
    },
    products: {
      type: Array,
      items: {
        type: Object,
        properties: {
          product_id: {
            type: String
          },
          product_name: {
            type: String
          },
          product_type: {
            type: String
          },
          manufacturer: {
            type: String
          },
          batch_Number: {
            type: String
          },
          characteristic_set: {
            type: Array,
            items: {
              type: Object,
              properties: {
                temperature_max: {
                  type: Number
                },
                temperature_min: {
                  type: Number
                },
                humidity_max: {
                  type: Number
                },
                humidity_min: {
                  type: Number
                },
                pressure_max: {
                  type: Number
                },
                pressure_min: {
                  type: Number
                }
              },
              /*required: [
                temperature_max,
                temperature_min,
                humidity_max,
                humidity_min,
                pressure_max,
                pressure_min
              ]*/
            }
          },
          product_quantity: {
            type: Number
          }
        },
        /*required: [
          product_id,
          product_name,
          product_type,
          manufacturer,
          batch_Number,
          characteristic_set,
          product_quantity
        ]*/
      }
    },
    product_ids: {
      type: Array,
      items: {
        type: Object,
        properties: {
          atom_id: {
            type: String
          },
          label: {
            type: Object,
            properties: {
              label_id: {
                type: String
              },
              label_type: {
                type: String
              }
            },
            /*required: [
              label_id,
              label_type
            ]*/
          },
          product_id: {
            type: String
          },
          inventory_ids: {
            type: Array,
            items: {
              type: String
            }
          },
          po_ids: {
            type: Array,
            items: {
              type: String
            }
          },
          shipment_ids: {
            type: Array,
            items: {
              type: String
            }
          },
          tx_ids: {
            type: Array,
            items: {
              type: String
            }
          },
          atom_status: {
            type: String
          },
          attribute_set: {
            type: Object,
            properties: {
              mfg_date: {
                type: String
              },
              exp_date: {
                type: String
              }
            },
            /*required: [
              mfg_date,
              exp_date
            ]*/
          },
          eol_info: {
            type: Object,
            properties: {
              eol_id: {
                type: String
              },
              eol_date: {
                type: String
              },
              eol_by: {
                type: String
              },
              eol_user_info: {
                type: String
              }
            },
            /*required: [
              eol_id,
              eol_date,
              eol_by,
              eol_user_info
            ]*/
          }
        },
        /*required: [
          atom_id,
          label,
          product_id,
          inventory_ids,
          po_ids,
          shipment_ids,
          tx_ids,
          atom_status,
          attribute_set,
          eol_info
        ]*/
      }
    }
  },
  /*required: [
    inventory_id,
    products,
    product_ids
  ]*/
//}
);
module.exports = mongoose.model('InventoryNew', InventorySchema);
