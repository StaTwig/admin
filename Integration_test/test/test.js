var config = require('./config.js')
const { test: { inventoriesUrl } } = config
const { test: { shipmentsSearch } } = config
const { test: { loginUrl } } = config
const { test: { registerUrl } } = config
const { test: { verifyOtpUrl } } = config
const { test: { shipmentsUrl } } = config
const { test: { createShipmentUrl } } = config
const { test: { addInventoryUrl } } = config
const { test: { userInfoUrl } } = config
const { test: { updateProfileUrl } } = config
const { test: { upload } } = config
const { test: { inventorySearch } } = config
const { test: { SERVER_URL } } = config
const { chai} = require("./testConfig");

const dotenv = require("dotenv").config();

var n = process.env.NO_OF_RUNS;

 console.log(process.argv[0])
  describe('/createShipment', () => {
  for (i=0;i<n;i++)
     {
      it('it should GET all the Shipments', (done) => {
       chai.request(SERVER_URL)
           .post(createShipmentUrl)
           .send({
                "receiver": "15gncMy8pbv8uxJ7V1oG3PwqM535ZFK8WmEAC5",
                "data" :{
                "shipmentId": "SHP5919",
                "client": "Unicef India",
                "receiver": "15gncMy8pbv8uxJ7V1oG3PwqM535ZFK8WmEAC5",
                "supplier": "Thrinethra",
                "supplierLocation": "Hyderabad",
                "shipmentDate": "04/22/2020",
                "deliveryTo": "Satheesh",
                "deliveryLocation": "Dubi",
                "estimateDeliveryDate": "04/30/2020",
                "status": "In Transit",
                "products": [{
                        "productName": "MMR",
                        "quantity": "1000",
                        "manufacturerName": "Manufacturer A",
                        "storageCondition": "Good",
                        "manufacturingDate": "04/22/2020",
                        "expiryDate": "04/22/2022",
                        "batchNumber": "BB1234",
                        "serialNumber": "SL1234"
                            }]
                        }
          })
          .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
             .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    return done();
            });
    	});
  }
 });
 

 describe('/fetchShipments', () => {
for (i=0;i<n;i++)
    { 
 it('it should GET all the Shipments', (done) => {
       chai.request(SERVER_URL)
           .get(shipmentsSearch)
           .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
            .query({'key':'SHP5919'})
            .end((err, res) => {
                  if (err) return done(err);
                  res.should.have.status(200);
                  return done();
            });
      });
 }
 });


 describe('/shipmentStatistics', () => {
for (i=0;i<n;i++)
                {  
  it('it should GET all the Shipments', (done) => {
       chai.request(SERVER_URL)
           .get(shipmentsUrl)
           .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
            .end((err, res) => {
                 if (err) return done(err);
                 res.should.have.status(200);
                 return done();
            });
      });
    }
 });


//INVENTORY
 describe('/addNewInventory', () => {
      for (i=0;i<n;i++)
                {
	  it('it should ADD new Inventory', (done) => {
       chai.request(SERVER_URL)
           .post(addInventoryUrl)
           .send({
                "data":{
                "productName":"BCG",
                "manufacturerName":"Aroma Biotech",
                "quantity":"100",
                "manufacturingDate":"05/04/2020",
                "expiryDate":"06/04/2020",
                "storageCondition":"10",
                "batchNumber":"10",
                "serialNumber":"5919"
                }
              })
              .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
             .end((err, res) => {
                     if (err) return done(err);
                     res.should.have.status(200);
                    return done();
            });
      });
}
 });

 describe('/getAllInventoryDetails', () => {
for (i=0;i<n;i++)
                { 
 it('it should GET all the Inventory', (done) => {
       chai.request(SERVER_URL)
           .get(inventoriesUrl)
           .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
             .end((err, res) => {
                     if (err) return done(err);
                     res.should.have.status(200);
                     return done();
            });
      });
	  }
 });


 describe('/getInventoryDetailsForProduct', () => {
      for (i=0;i<n;i++)
                {
	  it('it should details of the Product', (done) => {
       chai.request(SERVER_URL)
           .get(inventorySearch)
           .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllMzFjZjU3ODhlOTg2MWE3MjQ5Y2EiLCJlbWFpbCI6InRocmluZXRocmFAc3RhdHdpZy5jb20iLCJhZGRyZXNzIjoiMVhwUWNwb2hhc25zM0RoUFo0dWJZQ0ZpZU50dTczVUFMZDFMSG0iLCJpYXQiOjE1ODgyMDIyOTEsImV4cCI6NDc0Mzk2MjI5MX0.IrtugBNzc8JB5bDvbbh-X583KHPW-nwGpUeOxWaoyXI')
           .query({'key':'5919'})
           .end((err, res) => {
                  if (err) return done(err);
                  res.should.have.status(200);
                  return done();
            });
      });
	  }
 });




//USER PROFILE

        // Prepare data for testing
        const testData = {
                "firstName":"Hema",
                "lastName":"latha",
                "password":"12345678!",
                "email":"hema@statwig.com",
                "name":"Hemz",
                "confirmOTP":"1845"
        };


 describe("/register", () => {
                it("It should Register user", (done) => {
                        chai.request(SERVER_URL)
                                .post(registerUrl)
                                .send(testData)
                                .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.have.property("message").eql("Registration Success.");
                                        testData._id = res.body.data._id;
                                        done();
                                });
                });
        });


 describe("/verify-otp", () => {
                it("It should verify confirm OTP", (done) => {
                        chai.request(SERVER_URL)
                                .post(verifyOtpUrl)
                                .send({"email": testData.email, "otp": testData.confirmOTP})
                                .end((err, res) => {
                                        res.should.have.status(200);
                                        done();
                                });
                });
        });


        describe("/login", () => {
                for (i=0;i<n;i++)
                {
                        it("it should do user Login", (done) => {
                        chai.request(SERVER_URL)
                                .post(loginUrl)
                                .send({"email":"hema@statwig.com","password": "12345678!"})
                                .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.have.property("message").eql("Login Success.");
                                console.log("Result",res.body.data.token);
                                        done();
                                });
                });
                }
        });

