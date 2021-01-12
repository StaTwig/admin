var mongoose = require('mongoose');

var RecordsSchema = new mongoose.Schema(
  {
    po_id: {
      type: String
    },
    po_external_id: {
      type: String
    },
    po_creation_date: {
      type: String
    },
    po_created_by: {
      type: String
    },
    supplier: {
      type: Object,
      properties: {
        supplier_organization: {
          type: String
        },
        supplier_incharge: {
          type: String
        }
      },
      /*required: [
        supplier_organization,
        supplier_incharge
      ]*/
    },
    customer: {
      type: Object,
      properties: {
        customer_organization: {
          type: String
        },
        customer_incharge: {
          type: String
        },
        shipping_address: {
          type: Object,
          properties: {
            shipping_address_id: {
              type: String
            },
            shipment_receiver_id: {
              type: String
            }
          },
          /*required: [
            shipping_address_id,
            shipment_receiver_id
          ]*/
        }
      },
      /*required: [
        customer_organization,
        customer_incharge,
        shipping_address
      ]*/
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
          attribute_set: {
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
          attribute_set,
          product_quantity
        ]*/
      }
    },
    po_status: {
      type: String
    },
    last_updated_by: {
      type: String
    },
    last_updated_on: {},
    shipping_orders: {
      type: Array,
      items: {
        type: Object,
        properties: {
          shipping_order_id: {
            type: String
          },
          so_created_by: {
            type: String
          },
          so_assigned_to: {
            type: Array,
            items: {
              type: String
            }
          },
          so_updated_on: {
            type: String
          },
          so_updated_by: {
            type: String
          },
          so_status: {
            type: String
          }
        },
        /*required: [
          shipping_order_id,
          so_created_by,
          so_assigned_to,
          so_updated_on,
          so_updated_by,
          so_status
        ]*/
      }
    },
    shipments: {
      type: Array,
      items: {
        type: Object,
        properties: {
          shipment_id: {
            type: String
          },
          external_shipment_id: {
            type: String
          },
          shipment_supplier: {
            type: Object,
            properties: {
              supplier_id: {
                type: String
              },
              supplier_location_id: {
                type: String
              }
            },
            /*required: [
              supplier_id,
              supplier_location_id
            ]*/
          },
          receiver: {
            type: Object,
            properties: {
              receiver_id: {
                type: String
              },
              receiver_location_id: {
                type: String
              }
            },
            /*required: [
              receiver_id,
              receiver_location_id
            ]*/
          },
          shipping_date: {
            type: String
          },
          expected_delivery_date: {
            type: String
          },
          actual_delivery_date: {
            type: String
          },
          shipment_status: {
            type: String
          },
          transaction_ids: {
            type: Array,
            items: {
              type: String
            }
          },
          products: {
            type: Array,
            items: {
              type: String
            }
          }
        },
        /*required: [
          shipment_id,
          external_shipment_id,
          shipment_supplier,
          receiver,
          shipping_date,
          expected_delivery_date,
          actual_delivery_date,
          shipment_status,
          transaction_ids,
          products
        ]*/
      }
    }
  },
  /*required: [
    po_id,
    po_external_id,
    po_creation_date,
    po_created_by,
    supplier,
    customer,
    products,
    po_status,
    last_updated_by,
    last_updated_on,
    shipping_orders,
    shipments
  ]*/
);

module.exports = mongoose.model('Record', RecordsSchema);
