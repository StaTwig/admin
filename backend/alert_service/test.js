let data = {
    "_id" : "61085087f547083941045659",
    "eventID" : "ev0000odca3u5l5e",
    "eventTime" : "2021-08-02T20:07:32.839Z",
    "eventTypePrimary" : "CREATE",
    "eventTypeDesc" : "ORDER",
    "actorId" : "EMP100001",
    "actorUserId" : "dev@statwig.com",
    "caId" : "null",
    "caName" : "null",
    "caAddress" : "null",
    "actorOrgId" : "ORG100004",
    "actorOrgName" : "Bharat Biotech",
    "actorOrgAddress" : "Genome Valley Shameerpet, Hyderabad, Telangana, 500078",
    "actorWarehouseId" : "WAR100001",
    "secondaryOrgId" : "ORG100005",
    "secondaryOrgName" : "Serum Institute ",
    "secondaryOrgAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
    "payloadData" : {
        "data" : {
            "externalId" : "",
            "supplier" : {
                "supplierIncharge" : null,
                "supplierOrganisation" : "ORG100004",
                "supplierType" : "VENDOR"
            },
            "customer" : {
                "customerIncharge" : null,
                "customerOrganisation" : "ORG100005",
                "customerType" : "VENDOR",
                "region" : "Asia",
                "country" : "India",
                "shippingAddress" : {
                    "shippingAddressId" : "WAR100005",
                    "shipmentReceiverId" : null
                }
            },
            "lastUpdatedOn" : "2021-08-02T20:07:31.643Z",
            "creationDate" : "2021-08-02T20:07:31.643Z",
            "poStatus" : "CREATED",
            "products" : [ 
                {
                    "productId" : "AUG",
                    "id" : "AUG",
                    "productQuantity" : "230",
                    "name" : "Augmentin",
                    "type" : "Medicines",
                    "manufacturer" : "Bharath Biotech",
                    "unitofMeasure" : "EA"
                }
            ],
            "order_id" : "PO100185"
        }
    },
    "createdAt" : "2021-08-02T20:07:35.425Z",
    "updatedAt" : "2021-08-02T20:07:35.425Z",
    "__v" : 0
}
/*
 {
    "_id" : "61084dc323cfc1377b75c9c9",
    "eventID" : "ev00006bo8aisc7jq",
    "eventTime" : "2021-08-02T19:55:44.334Z",
    "eventTypePrimary" : "CREATE",
    "eventTypeDesc" : "ORDER",
    "actorId" : "EMP100001",
    "actorUserId" : "dev@statwig.com",
    "caId" : "null",
    "caName" : "null",
    "caAddress" : "null",
    "actorOrgId" : "ORG100004",
    "actorOrgName" : "Bharat Biotech",
    "actorOrgAddress" : "Genome Valley Shameerpet, Hyderabad, Telangana, 500078",
    "actorWarehouseId" : "WAR100001",
    "secondaryOrgId" : "ORG100005",
    "secondaryOrgName" : "Serum Institute ",
    "secondaryOrgAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
    "payloadData" : {
        "data" : {
            "externalId" : "",
            "supplier" : {
                "supplierIncharge" : null,
                "supplierOrganisation" : "ORG100004",
                "supplierType" : "VENDOR"
            },
            "customer" : {
                "customerIncharge" : null,
                "customerOrganisation" : "ORG100005",
                "customerType" : "VENDOR",
                "region" : "Asia",
                "country" : "India",
                "shippingAddress" : {
                    "shippingAddressId" : "WAR100005",
                    "shipmentReceiverId" : null
                }
            },
            "lastUpdatedOn" : "2021-08-02T19:55:43.204Z",
            "creationDate" : "2021-08-02T19:55:43.204Z",
            "poStatus" : "CREATED",
            "products" : [ 
                {
                    "productId" : "DAILY",
                    "id" : "DAILY",
                    "productQuantity" : "1212",
                    "name" : "Daily essentials kit",
                    "type" : "Medical Kits",
                    "manufacturer" : "Bharath Biotech",
                    "unitofMeasure" : "EA"
                }
            ]
        }
    },
    "createdAt" : "2021-08-02T19:55:47.232Z",
    "updatedAt" : "2021-08-02T19:55:47.232Z",
    "__v" : 0
}
/*
{
    "_id" : "60ffdfbea38588001e152fce",
    "eventID" : "ev0000mjjlytt3fn",
    "eventTime" : "2021-07-27T10:28:12.843Z",
    "eventTypePrimary" : "UPDATE",
    "eventTypeDesc" : "SHIPMENT",
    "actorId" : "EMP100005",
    "actorUserId" : "mansi@statwig.com",
    "caId" : "null",
    "caName" : "null",
    "caAddress" : "null",
    "actorOrgId" : "ORG100005",
    "actorOrgName" : "null",
    "actorOrgAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
    "actorWarehouseId" : "WAR100005",
    "secondaryOrgId" : "ORG100001",
    "secondaryOrgName" : "StaTwig",
    "secondaryOrgAddress" : "T-Hub, Hill Ridge Springs,,  Gachibowli, Hyderabad, 500032",
    "payloadData" : {
        "data" : {
            "label" : {
                "labelType" : "QR_2DBAR",
                "labelId" : "13"
            },
            "imageDetails" : [],
            "taggedShipments" : [ 
                ""
            ],
            "shipmentUpdates" : [ 
                {
                    "updatedOn" : "21/07/2021 03:44",
                    "status" : "CREATED",
                    "products" : [ 
                        {
                            "productCategory" : "Therapuetics",
                            "productID" : "REGEN-D",
                            "productQuantity" : "59940",
                            "batchNumber" : "111",
                            "productName" : "Regen-D 150",
                            "manufacturer" : "Bharath Biotech",
                            "type" : "Therapuetics",
                            "unitofMeasure" : {
                                "id" : "4",
                                "name" : "CAR"
                            },
                            "productId" : "REGEN-D"
                        }
                    ]
                }
            ],
            "transactionIds" : [ 
                null
            ],
            "rejectionRate" : 0,
            "airWayBillNo" : "27",
            "poId" : null,
            "externalShipmentId" : "",
            "supplier" : {
                "id" : "ORG100001",
                "locationId" : "WAR100001",
                "warehouse" : {
                    "_id" : "60dc1bd71072c0001e6a2d4f",
                    "title" : "StaTwig Headquarter",
                    "organisationId" : "ORG100001",
                    "postalAddress" : null,
                    "region" : {
                        "regionId" : "reg123",
                        "regionName" : "Earth Prime"
                    },
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "Australia"
                    },
                    "location" : {
                        "longitude" : "12.12323453534",
                        "latitude" : "13.123435345435",
                        "geohash" : "1231nejf923453"
                    },
                    "supervisors" : [],
                    "employees" : [],
                    "bottleCapacity" : 0,
                    "sqft" : 0,
                    "id" : "WAR100001",
                    "warehouseInventory" : "INV100001",
                    "warehouseAddress" : {
                        "firstLine" : "T-Hub, Hill Ridge Springs,",
                        "secondLine" : "",
                        "city" : "Gunn",
                        "state" : "Northern Territory",
                        "country" : "Australia",
                        "zipCode" : "500032"
                    },
                    "status" : "ACTIVE",
                    "createdAt" : "2021-06-30T07:23:03.201Z",
                    "updatedAt" : "2021-07-22T16:36:01.010Z",
                    "__v" : 0
                },
                "org" : {
                    "_id" : "60dc1bd51072c0001e6a2d4d",
                    "postalAddress" : "T-Hub, Hill Ridge Springs,,  Gachibowli, Hyderabad, 500032",
                    "region" : {
                        "id" : "reg123",
                        "name" : "Earth"
                    },
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : 12.12323453534,
                        "latitude" : 13.123435345435,
                        "geohash" : "1231nejf923453"
                    },
                    "warehouses" : [ 
                        "WAR100001"
                    ],
                    "supervisors" : [ 
                        "user_id 1", 
                        "user_id 2"
                    ],
                    "warehouseEmployees" : [ 
                        "EMP100001"
                    ],
                    "primaryContactId" : "EMP100001",
                    "name" : "StaTwig",
                    "id" : "ORG100001",
                    "type" : "CENTRAL_AUTHORITY",
                    "status" : "ACTIVE",
                    "configuration_id" : "CONF000",
                    "createdAt" : "2021-06-30T07:23:01.771Z",
                    "updatedAt" : "2021-06-30T07:23:01.771Z",
                    "__v" : 0
                }
            },
            "receiver" : {
                "id" : "ORG100005",
                "locationId" : "WAR100005",
                "warehouse" : {
                    "_id" : "60dc54df1072c0001e6a2d5b",
                    "title" : "Manufacturing unit ",
                    "organisationId" : "ORG100005",
                    "postalAddress" : null,
                    "region" : "",
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : "19.7515",
                        "latitude" : "75.7139",
                        "geohash" : "1231nejf923453"
                    },
                    "supervisors" : [],
                    "employees" : [],
                    "bottleCapacity" : 0,
                    "sqft" : 0,
                    "id" : "WAR100005",
                    "warehouseInventory" : "INV100005",
                    "warehouseAddress" : {
                        "firstLine" : "IT Hub, VP road",
                        "secondLine" : null,
                        "city" : "Pune",
                        "state" : "Maharashtra",
                        "country" : "India",
                        "landmark" : null,
                        "zipCode" : "400096"
                    },
                    "status" : "ACTIVE",
                    "createdAt" : "2021-06-30T11:26:23.460Z",
                    "updatedAt" : "2021-07-14T06:00:29.541Z",
                    "__v" : 0
                },
                "org" : {
                    "_id" : "60dc54de1072c0001e6a2d59",
                    "postalAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
                    "region" : {
                        "id" : "reg123",
                        "name" : "Earth Prime"
                    },
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : 12.12323453534,
                        "latitude" : 13.123435345435,
                        "geohash" : "1231nejf923453"
                    },
                    "warehouses" : [ 
                        "WAR100005"
                    ],
                    "supervisors" : [ 
                        "user_id 1", 
                        "user_id 2"
                    ],
                    "warehouseEmployees" : [ 
                        "EMP100005"
                    ],
                    "primaryContactId" : "EMP100005",
                    "name" : "Serum Institute ",
                    "id" : "ORG100005",
                    "type" : "VENDOR",
                    "status" : "ACTIVE",
                    "configuration_id" : "CONF000",
                    "createdAt" : "2021-06-30T11:26:22.406Z",
                    "updatedAt" : "2021-06-30T11:34:16.501Z",
                    "__v" : 0,
                    "typeId" : ""
                }
            },
            "shippingDate" : "2021-07-21T00:00:00.000Z",
            "expectedDeliveryDate" : "2021-07-26T00:00:00.000Z",
            "actualDeliveryDate" : "2021-07-26T00:00:00.000Z",
            "status" : "CREATED",
            "products" : [ 
                {
                    "rejectionRate" : 0,
                    "_id" : "60f7982d4c67b0001ef3f618",
                    "productCategory" : "Therapuetics",
                    "productID" : "REGEN-D",
                    "productQuantity" : 59940,
                    "batchNumber" : "111",
                    "productName" : "Regen-D 150",
                    "manufacturer" : "Bharath Biotech",
                    "unitofMeasure" : {
                        "id" : "4",
                        "name" : "CAR"
                    },
                    "isEditQty" : true,
                    "isUserQty" : false,
                    "productQuantityDelivered" : "59940",
                    "productQuantitySent" : "59940",
                    "productId" : "REGEN-D"
                }
            ],
            "id" : "SH100115"
        }
    },
    "createdAt" : "2021-07-27T10:28:14.724Z",
    "updatedAt" : "2021-07-27T10:28:14.724Z",
    "__v" : 0
}
/* {
    "_id" : "60ff0d2cc7842c001e2aada8",
    "eventID" : "ev00005suishmp1ee",
    "eventTime" : "2021-07-26T19:29:46.267Z",
    "eventTypePrimary" : "CREATE",
    "eventTypeDesc" : "SHIPMENT",
    "actorId" : "EMP100127",
    "actorUserId" : "hema@statwig.com",
    "caId" : "null",
    "caName" : "null",
    "caAddress" : "null",
    "actorOrgId" : "ORG100004",
    "actorOrgName" : "null",
    "actorOrgAddress" : "Genome Valley Shameerpet, Hyderabad, Telangana, 500078",
    "actorWarehouseId" : "WAR100125",
    "secondaryOrgId" : "ORG100005",
    "secondaryOrgName" : "Serum Institute ",
    "secondaryOrgAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
    "payloadData" : {
        "data" : {
            "airWayBillNo" : "DXDC000099",
            "poId" : null,
            "label" : {
                "labelId" : "QRDM000098",
                "labelType" : "QR_2DBAR"
            },
            "taggedShipments" : "",
            "externalShipmentId" : "",
            "supplier" : {
                "id" : "ORG100004",
                "locationId" : "WAR100125"
            },
            "receiver" : {
                "id" : "ORG100005",
                "locationId" : "WAR100005"
            },
            "shippingDate" : "2021-07-26T00:00:00.000Z",
            "expectedDeliveryDate" : "",
            "actualDeliveryDate" : "",
            "status" : "CREATED",
            "products" : [ 
                {
                    "productCategory" : "Therapuetics",
                    "productID" : "BIO",
                    "productQuantity" : "100",
                    "batchNumber" : "BIO888999",
                    "productName" : "Biogit",
                    "manufacturer" : "Bharath Biotech",
                    "type" : "Therapuetics",
                    "unitofMeasure" : {
                        "id" : "2",
                        "name" : "BOT"
                    },
                    "productId" : "BIO"
                }
            ],
            "id" : "SH100163",
            "shipmentUpdates" : {
                "updatedOn" : "26/07/2021 19:29",
                "status" : "CREATED",
                "products" : [ 
                    {
                        "productCategory" : "Therapuetics",
                        "productID" : "BIO",
                        "productQuantity" : "100",
                        "batchNumber" : "BIO888999",
                        "productName" : "Biogit",
                        "manufacturer" : "Bharath Biotech",
                        "type" : "Therapuetics",
                        "unitofMeasure" : {
                            "id" : "2",
                            "name" : "BOT"
                        },
                        "productId" : "BIO"
                    }
                ]
            }
        }
    },
    "createdAt" : "2021-07-26T19:29:48.495Z",
    "updatedAt" : "2021-07-26T19:29:48.495Z",
    "__v" : 0
}
/*
{
    "_id" : "60ff0e27c7842c001e2aadac",
    "eventID" : "ev0000uyspbrhuh2",
    "eventTime" : "2021-07-26T19:33:58.170Z",
    "eventTypePrimary" : "RECEIVE",
    "eventTypeDesc" : "SHIPMENT",
    "actorId" : "EMP100005",
    "actorUserId" : "mansi@statwig.com",
    "caId" : "null",
    "caName" : "null",
    "caAddress" : "null",
    "actorOrgId" : "ORG100005",
    "actorOrgName" : "null",
    "actorOrgAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
    "actorWarehouseId" : "WAR100005",
    "secondaryOrgId" : "ORG100004",
    "secondaryOrgName" : "Bharat Biotech",
    "secondaryOrgAddress" : "Genome Valley Shameerpet, Hyderabad, Telangana, 500078",
    "payloadData" : {
        "data" : {
            "_id" : "60ff0d2aa8eb74001e49d850",
            "label" : {
                "labelType" : "QR_2DBAR",
                "labelId" : "QRDM000098"
            },
            "imageDetails" : [],
            "taggedShipments" : [ 
                ""
            ],
            "shipmentUpdates" : [ 
                {
                    "updatedOn" : "26/07/2021 19:29",
                    "status" : "CREATED",
                    "products" : [ 
                        {
                            "productCategory" : "Therapuetics",
                            "productID" : "BIO",
                            "productQuantity" : "100",
                            "batchNumber" : "BIO888999",
                            "productName" : "Biogit",
                            "manufacturer" : "Bharath Biotech",
                            "type" : "Therapuetics",
                            "unitofMeasure" : {
                                "id" : "2",
                                "name" : "BOT"
                            },
                            "productId" : "BIO"
                        }
                    ]
                }
            ],
            "transactionIds" : [ 
                "2e8214699888695f71ed767fbdf09b2ed2bbecb02aff8ba67a9919cdf0ba2273"
            ],
            "rejectionRate" : 0,
            "airWayBillNo" : "DXDC000099",
            "poId" : null,
            "externalShipmentId" : "",
            "supplier" : {
                "id" : "ORG100004",
                "locationId" : "WAR100125",
                "warehouse" : {
                    "_id" : "60ec36d6c98f7c001e428e77",
                    "title" : "WareHouseUNit",
                    "organisationId" : "ORG100004",
                    "postalAddress" : null,
                    "region" : "Asia",
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "latitude" : 13.63194,
                        "longitude" : 79.41818
                    },
                    "supervisors" : [],
                    "employees" : [],
                    "bottleCapacity" : 0,
                    "sqft" : 0,
                    "id" : "WAR100125",
                    "warehouseAddress" : {
                        "firstLine" : "WareUnit",
                        "region" : "Asia",
                        "secondLine" : null,
                        "city" : "Tirupati",
                        "state" : "Andhra Pradesh",
                        "country" : "India",
                        "landmark" : null,
                        "zipCode" : "123"
                    },
                    "warehouseInventory" : "INV100120",
                    "status" : "ACTIVE",
                    "createdAt" : "2021-07-12T12:34:30.681Z",
                    "updatedAt" : "2021-07-26T19:20:25.265Z",
                    "__v" : 0,
                    "employeess" : []
                },
                "org" : {
                    "_id" : "60dc54b61072c0001e6a2d55",
                    "postalAddress" : "Genome Valley Shameerpet, Hyderabad, Telangana, 500078",
                    "region" : {
                        "id" : "reg123",
                        "name" : "Earth Prime"
                    },
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : 12.12323453534,
                        "latitude" : 13.123435345435,
                        "geohash" : "1231nejf923453"
                    },
                    "warehouses" : [ 
                        "WAR100004"
                    ],
                    "supervisors" : [ 
                        "user_id 1", 
                        "user_id 2"
                    ],
                    "warehouseEmployees" : [ 
                        "EMP100004"
                    ],
                    "primaryContactId" : "EMP100004",
                    "name" : "Bharat Biotech",
                    "id" : "ORG100004",
                    "type" : "VENDOR",
                    "status" : "ACTIVE",
                    "configuration_id" : "CONF000",
                    "createdAt" : "2021-06-30T11:25:42.839Z",
                    "updatedAt" : "2021-06-30T11:34:17.967Z",
                    "__v" : 0,
                    "typeId" : ""
                }
            },
            "receiver" : {
                "id" : "ORG100005",
                "locationId" : "WAR100005",
                "warehouse" : {
                    "_id" : "60dc54df1072c0001e6a2d5b",
                    "title" : "Manufacturing unit ",
                    "organisationId" : "ORG100005",
                    "postalAddress" : null,
                    "region" : "",
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : "0",
                        "latitude" : "0",
                        "geohash" : "1231nejf923453"
                    },
                    "supervisors" : [],
                    "employees" : [],
                    "bottleCapacity" : 0,
                    "sqft" : 0,
                    "id" : "WAR100005",
                    "warehouseInventory" : "INV100005",
                    "warehouseAddress" : {
                        "firstLine" : "IT Hub, VP road",
                        "secondLine" : null,
                        "city" : "Pune",
                        "state" : "Maharashtra",
                        "country" : "India",
                        "landmark" : null,
                        "zipCode" : "400096"
                    },
                    "status" : "ACTIVE",
                    "createdAt" : "2021-06-30T11:26:23.460Z",
                    "updatedAt" : "2021-07-14T06:00:29.541Z",
                    "__v" : 0
                },
                "org" : {
                    "_id" : "60dc54de1072c0001e6a2d59",
                    "postalAddress" : "IT Hub, VP road, Pune, Maharashtra, 400096",
                    "region" : {
                        "id" : "reg123",
                        "name" : "Earth Prime"
                    },
                    "country" : {
                        "countryId" : "001",
                        "countryName" : "India"
                    },
                    "location" : {
                        "longitude" : 12.12323453534,
                        "latitude" : 13.123435345435,
                        "geohash" : "1231nejf923453"
                    },
                    "warehouses" : [ 
                        "WAR100005"
                    ],
                    "supervisors" : [ 
                        "user_id 1", 
                        "user_id 2"
                    ],
                    "warehouseEmployees" : [ 
                        "EMP100005"
                    ],
                    "primaryContactId" : "EMP100005",
                    "name" : "Serum Institute ",
                    "id" : "ORG100005",
                    "type" : "VENDOR",
                    "status" : "ACTIVE",
                    "configuration_id" : "CONF000",
                    "createdAt" : "2021-06-30T11:26:22.406Z",
                    "updatedAt" : "2021-06-30T11:34:16.501Z",
                    "__v" : 0,
                    "typeId" : ""
                }
            },
            "shippingDate" : "2021-07-26T00:00:00.000Z",
            "expectedDeliveryDate" : "",
            "actualDeliveryDate" : "",
            "status" : "CREATED",
            "products" : [ 
                {
                    "rejectionRate" : 0,
                    "_id" : "60ff0d2aa8eb74001e49d851",
                    "productCategory" : "Therapuetics",
                    "productID" : "BIO",
                    "productQuantity" : 100,
                    "batchNumber" : "BIO888999",
                    "productName" : "Biogit",
                    "manufacturer" : "Bharath Biotech",
                    "unitofMeasure" : {
                        "id" : "2",
                        "name" : "BOT"
                    },
                    "productId" : "BIO"
                }
            ],
            "id" : "SH100163",
            "createdAt" : "2021-07-26T19:29:46.271Z",
            "updatedAt" : "2021-07-26T19:29:46.604Z",
            "__v" : 0,
            "comment" : ""
        }
    },
    "createdAt" : "2021-07-26T19:33:59.850Z",
    "updatedAt" : "2021-07-26T19:33:59.850Z",
    "__v" : 0
} */

console.log(data.payloadData.data.order_id)
