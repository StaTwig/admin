const ShipmentModel = require("../models/ShipmentModel");
const AtomModel = require("../models/AtomModel");

async function ScanShipment(QRcode) {
  const shipments = await ShipmentModel.aggregate([
    {
      $match: {
        "label.labelId": QRcode,
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "supplier.locationId",
        foreignField: "id",
        as: "supplier.warehouse",
      },
    },
    {
      $unwind: {
        path: "$supplier.warehouse",
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "supplier.warehouse.organisationId",
        foreignField: "id",
        as: "supplier.org",
      },
    },
    {
      $unwind: {
        path: "$supplier.org",
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "receiver.locationId",
        foreignField: "id",
        as: "receiver.warehouse",
      },
    },
    {
      $unwind: {
        path: "$receiver.warehouse",
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "receiver.warehouse.organisationId",
        foreignField: "id",
        as: "receiver.org",
      },
    },
    {
      $unwind: {
        path: "$receiver.org",
      },
    },
  ]);
  return shipments;
}

async function ScanProduct(QRcode) {
  const product = await AtomModel.aggregate([
    {
      $match: {
        "label.labelId": QRcode,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "id",
        as: "productDetails",
      },
    },
    {
      $unwind: {
        path: "$productDetails",
      },
    },
    {
      $project: {
        productId: 1,
        label: 1,
        id: 1,
        batchNumbers: 1,
        quantity: 1,
        name: "$productDetails.type",
        type: "$productDetails.name",
        manufacturer: "$productDetails.manufacturer",
        unitofMeasure: {
          id: "$productDetails.unitofMeasure.id",
          name: "$productDetails.unitofMeasure.name",
        },
      },
    },
  ]);
  return product;
}

module.exports = { ScanShipment, ScanProduct };
