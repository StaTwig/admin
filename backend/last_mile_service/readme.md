GET - GetEOLInfoBySerialNumber => lastmilemanagement/api/getEOLInfoBySerialNumber?id={serial_num}
GET - GetEOLInfoByProductId => lastmilemanagement/api/GetEOLInfoByProductId?id={product_id}
GET - GetEOLInfoByIdentityId => lastmilemanagement/api/GetEOLInfoByIdentityId?id={aadhar_no}
GET - GetEOLInfoByPlaceAdministered => lastmilemanagement/api/GetEOLInfoByPlaceAdministered?place={warehouse_id}
GET - GetEOLListByDateWindow => lastmilemanagement/api/GetEOLListByDateWindow?startDate={date}&endDate={date} //date format is YYYY-MM-DD


POST - AddNewEOL => lastmilemanagement/api/AddNewEOL // refer LastMileModel for request body parameters. 


POST - UpdateExistingEOLByID => lastmilemanagement/api/UpdateExistingEOLByID // refer LastMileModel for request body parameters. 

## Note: Updation requires all the params, So data has to be fetched before calling this API and whole data has to be sent with required params edited.

