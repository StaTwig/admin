Endpoints:
GET / getProducts => get all products

request:
eg: http://localhost:3010/productmanagement/api/products/getProducts

Response:
{
    "data": [
        {
            "characteristic_set": {
                "temperature_max": {
                    "$numberDecimal": "97.8"
                },
                "temperature_min": {
                    "$numberDecimal": "-4.5"
                },
                "humidity_max": {
                    "$numberDecimal": "56.3"
                },
                "humidity_min": {
                    "$numberDecimal": "23.1"
                },
                "pressure_max": {
                    "$numberDecimal": "2"
                },
                "pressure_min": {
                    "$numberDecimal": "1"
                }
            },
            "_id": "6002f611151deb6bccf7f770",
            "product_id": "prod-18v6alakkjzss2wl",
            "product_external_id": "ex12345",
            "product_name": "Samsung Galaxy S22 FE",
            "product_short_name": "S22 FE",
            "product_type": "Mobile Phone",
            "manufacturer": "organization_id 1",
            "image": "http://localhost:3010/images/undefined.png",
            "createdAt": "2021-01-16T14:20:01.863Z",
            "updatedAt": "2021-01-16T14:20:01.863Z",
            "__v": 0
        }
    ]
}

GET /generateCodes =>
[untouched] Same as Previous

POST /addProduct => Add a Single product manually
request:
{
    "product_external_id": "ex12345",
    "product_name": "Samsung Galaxy S22 FE",
    "product_short_name": "S22 FE",
    "product_type": "Mobile Phone",
    "manufacturer": "organization_id 1",
    "characteristic_set":
      {
        "temperature_max": 97.8,
        "temperature_min": -4.5,
        "humidity_max": 56.3,
        "humidity_min": 23.1,
        "pressure_max": 2,
        "pressure_min": 1
      }
    "image":(optional)
  }

  // image not provide , defalut image is set


  POST /addMultipleProducts => EXCEL File as input

  EXCEL File Structure:
                    product_external_id: element[0],
                    product_name: element[1],
                    product_short_name: element[2],
                    product_type: element[3],
                    manufacturer: element[4],
                    temperature_max: element[5],
                    temperature_min: element[6],
                    humidity_max: element[7],
                    humidity_min: element[8],
                    pressure_max: element[9],
                    pressure_min: element[10]