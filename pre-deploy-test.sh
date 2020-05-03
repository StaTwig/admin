#!/bin/bash
# creating env file for user_services
rm -f backend/user_service/.env
echo "MONGODB_URL=mongodb://trinu:apsd2002@cluster0-wjcba.mongodb.net:27017,cluster0-shard-00-01-wjcba.mongodb.net:27017,cluster0-shard-00-02-wjcba.mongodb.net:27017/vaccineledger?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=info@babyboo.in
EMAIL_SMTP_PASSWORD=NetStar2019
EMAIL_SMTP_SECURE=false
URL='http://test.vaccineledger.com:9001/blockchainmanagement'" >> backend/user_service/.env


#creating env file for shipping service
rm -f backend/shipping_service/.env
echo "JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://test.vaccineledger.com:9001/blockchainmanagement'
SHIP_STREAM='test_stream_shipment'
PO_STREAM='test_stream_order'" >> backend/shipping_service/.env


#creating env file for inventory service
rm -f backend/inventory_service/.env
echo "JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://test.vaccineledger.com:9001/blockchainmanagement'
STREAM='test_stream_inventory'" >> backend/inventory_service/.env


#creating env file for blockchain service
rm -f backend/blockchain_service/.env
echo "PORT = 7424
HOST = 'localhost'
USERNAME = 'multichainrpc'
PASSWORD = '2rc2t2sPSaYQfCCcArSmL2SByXL1ef2Q5uo2QiktgWtU'
MC_VERSION = '1.0'
STREAMS = \"test_stream_shipment,test_stream_inventory,test_stream_order\"" >> backend/blockchain_service/.env


