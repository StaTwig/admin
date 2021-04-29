var mongoose = require('mongoose');
var LastMileSchema = new mongoose.Schema(
{
  properties: {
    eol_id: {
      required: true,
      type: string
    },
    eol_info: {
      type: object,
      required: true,
      properties: {
        first_name: {
          type: string
        },
        last_name: {
          type: string
        },
        gender: {
          type: string
        },
        age: {
          type: number
        },
        contact_number: {
          type: number
        },
        contact_address: {
          type: object,
          properties: {
            firstLine: {
              type: string
            },
            secondLine: {
              type: string
            },
            district: {
              type: string
            },
            state: {
              type: string
            },
            country: {
              type: string
            },
            landmark: {
              type: string
            },
            zipcode: {
              type: number
            }
          },
          required: [
            firstLine,
            secondLine,
            district,
            state,
            country,
            landmark,
            zipcode
          ]
        },
        idProof: {
          type: object,
          properties: {
            idType: {
              type: string
            },
            idNo: {
              type: string
            }
          },
          required: [
            idType,
            idNo
          ]
        }
      },
      required: [
        first_name,
        last_name,
        gender,
        age,
        contact_number,
        contact_address,
        idProof
      ]
    },
    productAdministeredInfo: {
      required: true,        
      type: array,
      items: {
        type: object,
        properties: {
          dose: {
            required: true,                    
            type: string
          },
          productId: {
            required: true,                    
            type: string
          },
          productName: {
            required: true,                    
            type: string
          },
          productMfg: {
            required: true,                    
            type: string
          },
          productBatchNo: {
            required: true,                    
            type: string
          },
          locationInfo: {
            type: object,
            required: true,                    
            properties: {
              warehouseId: {
                type: string
              },
              warehouseTitle: {
                type: string
              }
            },
            required: [
              warehouseId,
              warehouseTitle
            ]
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
        }
        }
      }
    }
  }
}
);
module.exports = mongoose.model('lastmile', LastMileSchema);
