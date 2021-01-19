const mongoose = require("mongoose");
const { Decimal128} = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
	product_id:{type:String, required:true, unique:true},
	product_external_id:{type:String, required:true},
	product_name: {type: String, required: true},
	product_short_name: {type: String, required: true},
	product_type:{type:String,required:true},
	manufacturer: {type: String, required: true},
	image: {type: String, required: false},
	characteristic_set:{
		temperature_max:{type:Decimal128,required:true},
		temperature_min:{type:Decimal128,required:true},
		humidity_max:{type:Decimal128,required:true},
		humidity_min:{type:Decimal128,required:true},
		pressure_max:{type:Decimal128,required:true},
		pressure_min:{type:Decimal128,required:true}
	}
}, {timestamps: true});
module.exports = mongoose.model("Product", ProductSchema);