var mongoose = require("mongoose");
var base64Img = require('base64-img');
const defaultdp = base64Img.base64('uploads/default.jpg', function(err, data) {
	return data;
})
var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},	
	password: {type: String, required: true},
	isConfirmed: {type: Boolean, required: true, default: 0},
	confirmOTP: {type: String, required:false},
	address: {type: String, required:false, default: ''},
	otpTries: {type: Number, required:false, default: 0},
	status: {type: Boolean, required: true, default: 1},
	profile_picture: {type: String, required:false, default: defaultdp},
	image_location: {type:String,require:false},
	organization: {type: String, required: false},
	phone: {type: String, required: false}
}, {timestamps: true});

// Virtual for user's full name
/*UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});*/

module.exports = mongoose.model("User", UserSchema);