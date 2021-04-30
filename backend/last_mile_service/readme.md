`GET - GetEOLInfoBySerialNumber => lastmilemanagement/api/GetEOLInfoBySerialNumber?id={serial_num}`

`GET - GetEOLInfoByProductId => lastmilemanagement/api/GetEOLInfoByProductId?id={product_id}`

`GET - GetEOLInfoByIdentityId => lastmilemanagement/api/GetEOLInfoByIdentityId?id={aadhar_no}`

`GET - GetEOLInfoByPlaceAdministered => lastmilemanagement/api/GetEOLInfoByPlaceAdministered?place={warehouse_id}`


 ###### date format is YYYY-MM-DD
`GET - GetEOLListByDateWindow => lastmilemanagement/api/GetEOLListByDateWindow?startDate={date}&endDate={date}`

###### refer LastMileModel for request body parameters. 

`POST - AddNewEOL => lastmilemanagement/api/AddNewEOL`

###### Note: Updation requires all the params, So data has to be fetched before calling this API and whole data has to be sent with required params edited.

`POST - UpdateExistingEOLByID => lastmilemanagement/api/UpdateExistingEOLByID`  


