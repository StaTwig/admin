var mongoose = require('mongoose')

var ExcelSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productSubName: { type: String, required: true },
    depot: { type: String, required: true },
    actualSales: { type: String, required: true },
    targetSales: { type: String, required: true },
    productId: { type: String, required: false },
    warehouseId: { type: String, required: false },
    uploadDate: { type: String, required: true }
  },
  { timestamps: true },
)

module.exports = mongoose.model('Excel', ExcelSchema)
