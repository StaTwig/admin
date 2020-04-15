#!/bin/bash
# creating env file for user_services
rm -f backend/user_service/.env
echo "MONGODB_URL=mongodb://trinu:apsd2002@cluster0-wjcba.mongodb.net:27017,cluster0-shard-00-01-wjcba.mongodb.net:27017,cluster0-shard-00-02-wjcba.mongodb.net:27017/vaccineledger?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
WT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=info@babyboo.in
EMAIL_SMTP_PASSWORD=NetStar2019
EMAIL_SMTP_SECURE=false
URL='http://3.91.225.127:3008'" >> backend/user_service/.env


#creating env file for shipping service
rm -f backend/shipping_service/.env
echo "JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://3.91.225.127:3008'
STREAM='test_stream_shipment'" >> backend/shipping_service/.env


#creating env file for inventory service
rm -f backend/inventory_service/.env
echo "JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://3.91.225.127:3008'
STREAM='test_stream_inventory'" >> backend/inventory_service/.env


#creating env file for blockchain service

