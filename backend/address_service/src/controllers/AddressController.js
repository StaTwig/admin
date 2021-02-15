const apiResponse = require("../utils/apiResponse")

/**
 * LOGGING
 */
// const init = require("../utils/logging")
// const logger = init.getLog()

exports.addressesOfOrg = [
    async(req,res)=>{
        try{
            res.json({status:"OK shown"})

        } catch{
            // logger.log(
            //     "error",
            //     "<<<<< ProductService < ProductController < getProducts : error (catch block)"
            //   );
              return apiResponse.ErrorResponse(res, err);
        }
    }
]