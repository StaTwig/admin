var mongoose = require("mongoose");
ConfigurationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    updated_on: {
      type: String,
    },
    analytics: {
      type: Object,
      properties: {
        overview: {
          type: Object,
          properties: {
            total_products_added: {
              type: Boolean,
            },
            total_products_expiring_this_week: {
              type: Boolean,
            },
            total_products_expiring_this_month: {
              type: Boolean,
            },
            total_products_expiring_this_year: {
              type: Boolean,
            },
            total_products_expired_this_week: {
              type: Boolean,
            },
            total_products_expired_this_month: {
              type: Boolean,
            },
            total_products_expired_this_year: {
              type: Boolean,
            },
            total_shipments_sent: {
              type: Boolean,
            },
            total_shipments_received: {
              type: Boolean,
            },
            total_products_sent: {
              type: Boolean,
            },
            total_products_received: {
              type: Boolean,
            },
            total_shipments_in_transit: {
              type: Boolean,
            },
            total_shipments_with_delay_in_transit: {
              type: Boolean,
            },
            total_products_in_inventory: {
              type: Boolean,
            },
            total_products_added_to_inventory: {
              type: Boolean,
            },
          },
        },
        shipments: {
          type: Object,
          properties: {
            total_products_added: {
              type: Boolean,
            },
            total_products_expiring_this_week: {
              type: Boolean,
            },
            total_products_expiring_this_month: {
              type: Boolean,
            },
            total_products_expiring_this_year: {
              type: Boolean,
            },
            total_products_expired_this_week: {
              type: Boolean,
            },
            total_products_expired_this_month: {
              type: Boolean,
            },
            total_products_expired_this_year: {
              type: Boolean,
            },
            total_shipments_sent: {
              type: Boolean,
            },
            total_shipments_received: {
              type: Boolean,
            },
            total_products_sent: {
              type: Boolean,
            },
            total_products_received: {
              type: Boolean,
            },
            total_shipments_in_transit: {
              type: Boolean,
            },
            total_shipments_with_delay_in_transit: {
              type: Boolean,
            },
            total_products_in_inventory: {
              type: Boolean,
            },
            total_products_added_to_inventory: {
              type: Boolean,
            },
          },
        },
        inventory: {
          type: Object,
          properties: {
            total_products_added: {
              type: Boolean,
            },
            total_products_expiring_this_week: {
              type: Boolean,
            },
            total_products_expiring_this_month: {
              type: Boolean,
            },
            total_products_expiring_this_year: {
              type: Boolean,
            },
            total_products_expired_this_week: {
              type: Boolean,
            },
            total_products_expired_this_month: {
              type: Boolean,
            },
            total_products_expired_this_year: {
              type: Boolean,
            },
            total_shipments_sent: {
              type: Boolean,
            },
            total_shipments_received: {
              type: Boolean,
            },
            total_products_sent: {
              type: Boolean,
            },
            total_products_received: {
              type: Boolean,
            },
            total_shipments_in_transit: {
              type: Boolean,
            },
            total_shipments_with_delay_in_transit: {
              type: Boolean,
            },
            total_products_in_inventory: {
              type: Boolean,
            },
            total_products_added_to_inventory: {
              type: Boolean,
            },
          },
        },
      },
    },
    process: {
      type: Boolean,
    },
    active_locations: {
      type: Number,
    },
    organisationApproval: { type: Boolean },

    organisationTypes: {
      type: Array,
      items: {
        type: Object,
        properties: {
          id: { type: String },
          name: { type: String },
        },
      },
    },
    warehouseTypes: {
      type: Array,
      items: {
        type: Object,
        properties: {
          id: { type: String },
          name: {
            type: String,
          },
        },
      },
    },
    monitoring: {
      type: Object,
      properties: {
        iot_sensors: {
          type: Boolean,
        },
        qr_code: {
          type: Boolean,
        },
        "2dbar_code": {
          type: Boolean,
        },
      },
    },
    integrations: {
      type: Object,
      properties: {
        sms: {
          type: Boolean,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Configuration", ConfigurationSchema);

// const mongoose = require('mongoose');

// const ConfigurationSchema = new mongoose.Schema(
//   {
//     configuration_id: { type: String, required: true, unique: true },
//     conf_updated_on:{type:String},
//     analytics: {type: Object,
//     properties: {
//       overview: {
//         type: Object,
//         properties: {
//           total_products_added: {
//             type: Boolean
//           },
//           total_products_expiring_this_week: {
//             type: Boolean
//           },
//           total_products_expiring_this_month: {
//             type: Boolean
//           },
//           total_products_expiring_this_year: {
//             type: Boolean
//           },
//           total_products_expired_this_week: {
//             type: Boolean
//           },
//           total_products_expired_this_month: {
//             type: Boolean
//           },
//           total_products_expired_this_year: {
//             type: Boolean
//           },
//           total_shipments_sent: {
//             type: Boolean
//           },
//           total_shipments_received: {
//             type: Boolean
//           },
//           total_products_sent: {
//             type: Boolean
//           },
//           total_products_received: {
//             type: Boolean
//           },
//           total_shipments_in_transit: {
//             type: Boolean
//           },
//           total_shipments_with_delay_in_transit: {
//             type: Boolean
//           },
//           total_products_in_inventory: {
//             type: Boolean
//           },
//           total_products_added_to_inventory: {
//             type: Boolean
//           },
//           total_number_of_product_types_in_inventory: {
//             type: Boolean
//           },
//           total_number_of_outgoing_shipments: {
//             type: Boolean
//           },
//           total_number_of_incoming_shipments_in_transit: {
//             type: Boolean
//           },
//           number_of_products_with_zero_quantity: {
//             type: Boolean
//           },
//           total_number_of_products_expired: {
//             type: Boolean
//           },
//           total_pending_orders: {
//             type: Boolean
//           },
//           inventory_to_order_ratio: {
//             type: Boolean
//           },
//           average_order_processing_time: {
//             type: Boolean
//           },
//           total_batches_near_expiration: {
//             type: Boolean
//           },
//           total_batches_expired: {
//             type: Boolean
//           }
//         },

//       },
//       shipments: {
//         type: Object,
//         properties: {
//           total_products_added: {
//             type: Boolean
//           },
//           total_products_expiring_this_week: {
//             type: Boolean
//           },
//           total_products_expiring_this_month: {
//             type: Boolean
//           },
//           total_products_expiring_this_year: {
//             type: Boolean
//           },
//           total_products_expired_this_week: {
//             type: Boolean
//           },
//           total_products_expired_this_month: {
//             type: Boolean
//           },
//           total_products_expired_this_year: {
//             type: Boolean
//           },
//           total_shipments_sent: {
//             type: Boolean
//           },
//           total_shipments_received: {
//             type: Boolean
//           },
//           total_products_sent: {
//             type: Boolean
//           },
//           total_products_received: {
//             type: Boolean
//           },
//           total_shipments_in_transit: {
//             type: Boolean
//           },
//           total_shipments_with_delay_in_transit: {
//             type: Boolean
//           },
//           total_products_in_inventory: {
//             type: Boolean
//           },
//           total_products_added_to_inventory: {
//             type: Boolean
//           },
//           total_number_of_product_types_in_inventory: {
//             type: Boolean
//           },
//           total_number_of_outgoing_shipments: {
//             type: Boolean
//           },
//           total_number_of_incoming_shipments_in_transit: {
//             type: Boolean
//           },
//           number_of_products_with_zero_quantity: {
//             type: Boolean
//           },
//           total_number_of_products_expired: {
//             type: Boolean
//           },
//           total_pending_orders: {
//             type: Boolean
//           },
//           inventory_to_order_ratio: {
//             type: Boolean
//           },
//           average_order_processing_time: {
//             type: Boolean
//           },
//           total_batches_near_expiration: {
//             type: Boolean
//           },
//           total_batches_expired: {
//             type: Boolean
//           }
//         },

//       },
//       inventory: {
//         type: Object,
//         properties: {
//           total_products_added: {
//             type: Boolean
//           },
//           total_products_expiring_this_week: {
//             type: Boolean
//           },
//           total_products_expiring_this_month: {
//             type: Boolean
//           },
//           total_products_expiring_this_year: {
//             type: Boolean
//           },
//           total_products_expired_this_week: {
//             type: Boolean
//           },
//           total_products_expired_this_month: {
//             type: Boolean
//           },
//           total_products_expired_this_year: {
//             type: Boolean
//           },
//           total_shipments_sent: {
//             type: Boolean
//           },
//           total_shipments_received: {
//             type: Boolean
//           },
//           total_products_sent: {
//             type: Boolean
//           },
//           total_products_received: {
//             type: Boolean
//           },
//           total_shipments_in_transit: {
//             type: Boolean
//           },
//           total_shipments_with_delay_in_transit: {
//             type: Boolean
//           },
//           total_products_in_inventory: {
//             type: Boolean
//           },
//           total_products_added_to_inventory: {
//             type: Boolean
//           },
//           total_number_of_product_types_in_inventory: {
//             type: Boolean
//           },
//           total_number_of_outgoing_shipments: {
//             type: Boolean
//           },
//           total_number_of_incoming_shipments_in_transit: {
//             type: Boolean
//           },
//           number_of_products_with_zero_quantity: {
//             type: Boolean
//           },
//           total_number_of_products_expired: {
//             type: Boolean
//           },
//           total_pending_orders: {
//             type: Boolean
//           },
//           inventory_to_order_ratio: {
//             type: Boolean
//           },
//           average_order_processing_time: {
//             type: Boolean
//           },
//           total_batches_near_expiration: {
//             type: Boolean
//           },
//           total_batches_expired: {
//             type: Boolean
//           }
//         },

//       }
//     },
//   },
//     organisationApproval:{type:Boolean},
//     organisationTypes: {
//       type: Array,
//       items: {
//         type: Object,
//         properties: {
//           id: {type: String},
//           name: {type: String}
//         },
//       },
//     },
//     warehouseTypes: {
//       type: Array,
//       items: {type: Object,
//         properties: {
//           id: {type:String},
//           name: {
//             type:String
//           }
//         },
//       }
//     },
//     // monitoring:{type:Object},
//     monitoring: {
//       type: Object,
//       properties: {
//         iot_sensors: {
//           type: Boolean},
//         qr_code: {type: Boolean},
//         "2dbar_code": {type: Boolean},
//       },

//     },
//     integrations: {
//       type: Object,
//       properties: {
//         sms: {
//           type: Boolean
//         }
//       },
//     },
//   },
//   { timestamps: true },
// );
// module.exports = mongoose.model('Configuration', ConfigurationSchema);
