var mongoose = require("mongoose");

var ConfigurationsSchema = new mongoose.Schema({
    state: { type: String },
    district: { type: String },
    vendorType: { type: String },
    vendorId: { type: String },
    returnRate: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
    leadTime: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
    breakageBottle: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
    dirtyBottle: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
    warehouseCapacity: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
    bottleCapacity: {
        target : { type: String},
        min: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        },
        max: {
            operator: { type: String },
            value: { type: String },
            rating: { type: String }
        }
    },
}, { timestamps: true });

module.exports = mongoose.model("analytics_configuration", ConfigurationsSchema);
