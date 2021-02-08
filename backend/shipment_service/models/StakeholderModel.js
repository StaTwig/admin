var mongoose = require("mongoose");

StakeholderSchema = new mongoose.Schema({
    organization_id: {
      type: String
    },
    organization_name: {
      type: String
    },
    postal_address: {
      type: String
    },
    region: {
      type: Object,
      properties: {
        region_id: {
          type: String
        },
        region_name: {
          type: String
        }
	},
      
    //  required: [
      //  region_id,
       // region_name
    //  ]
    },
    country: {
      type: Object,
      properties: {
        country_id: {
          type: String
        },
        country_name: {
          type: String
        }
      },
      //required: [
        //country_id,
        //country_name
     // ]
    },
    primary_contact_id: {
      type: String
    },
    organization_type: {
      type: String
    },
    warehouses: {
      type: Array,
      items: {
        type: Object,
        properties: {
          warehouse_id: {
            type: String
          },
          postal_address: {
            type: String
          },
          region: {
            type: Object,
            properties: {
              region_id: {
                type: String
              },
              region_name: {
                type: String
              }
            },
            required: [
              //region_id,
              //region_name
            ]
          },
          country: {
            type: Object,
            properties: {
              country_id: {
                type: String
              },
              country_name: {
                type: String
              }
            },
            required: [
              //country_id,
             // country_name
            ]
          },
          location: {
            type: Object,
            properties: {
              longitude: {
                type: Number
              },
              latitude: {
                type: Number
              },
              geohash: {
                type: String
              }
            },
            required: [
              //longitude,
              //latitude,
             // geohash
            ]
          },
          supervisors: {
            type: Array,
            items: {
              type: String
            }
          },
          warehouseEmployees: {
            type: Array,
            items: {
              type: String
            }
          },
          warehouseInventory: {
            type: String
          }
        },
        required: [
          //warehouse_id,
          //postal_address,
          //region,
          //country,
          //location,
          //supervisors,
          //warehouse_employeess,
          //warehouse_inventory
        ]
      }
    },
    employees: {
      type: Array,
      items: {
        type: Object,
        properties: {
          user_id: {
            type: String
          },
          wallet_address: {
            type: String
          },
          account_status: {
            type: String
          },
          first_name: {
            type: String
          },
          last_name: {
            type: String
          },
          photo_id: {
            type: String
          },
          email_id: {
            type: String
          },
          phone_number: {
            type: Number
          },
          department: {
            type: String
          },
          job_title: {
            type: String
          },
          organization_id: {
            type: String
          },
          warehouse_id: {
            type: String
          },
          affiliated_organizations: {
            type: Array,
            items: {
              type: String
            }
          },
          role: {
            type: String
          },
          postal_address: {
            type: String
          }
        },
        required: [
         /* user_id,
          wallet_address,
          account_status,
          first_name,
          last_name,
          photo_id,
          email_id,
          phone_number,
          department,
          job_title,
          organization_id,
          warehouse_id,
          affiliated_organizations,
          role,
          postal_address */
        ]
      }
    }
})

module.exports = mongoose.model("Stakeholder", StakeholderSchema);

