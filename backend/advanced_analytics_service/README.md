# Analytics Service 

This Service will return the Advanced Analytics
## Endpoints

getAllStats  - Return{ inBrewery,s1Vendors,s2Vendors, data: [ {Sales, Return bottles, Target, Actual Return} ]}
getStatsBySKU/:sku/:state
getStatsByState/:state/:sku
getStatsByBrewery/:sku
getSales/:state/:tenure
getReturnedRate/:state/:tenure
getTarget/:state/:tenure
getActualReturns/:state/:tenure
getAllBrands [ { brandId } ]
getProductsById [ { sku , returnRate, productName, productDesc } ]
getInventoryBySku/:sku/:state [ { state, totalBottlePool } ]
getInventoryByBrand/:brand/:state/:sku