#!/bin/bash
# creating env file for user_services
rm -f backend/employee_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/employee_service/.env


#creating env file for shipment service
rm -f backend/shipment_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
SHIP_STREAM='test_stream_shipment'
PO_STREAM='test_stream_order'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/shipment_service/.env


#creating env file for inventory service
rm -f backend/inventory_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
PRODUCT_URL='http://abinbev.vaccineledger.com:9001/productmanagement/api/products'
STREAM='test_stream_inventory'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/inventory_service/.env


#creating env file for blockchain service
rm -f backend/blockchain_service/.env
echo "PORT = 4756
HOST = '15.206.159.129'
USERNAME = 'multichainrpc'
PASSWORD = '4pSjQbpmnbfff45dcqJsLsui2BxwEh8g3LiZApqmkeXX'
MC_VERSION = '1.0'
STREAMS = \"test_stream_shipment,test_stream_inventory,test_stream_order\"
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/blockchain_service/.env





#creating env file for alert service
rm -f backend/alert_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/alert_service/.env


#creating env file for log service
rm -f backend/log_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/log_service/.env


#creating env file for notification service
rm -f backend/notification_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/notification_service/.env

#creating env file for tracktrace sevice
rm -f backend/track_trace/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
SHIP_STREAM=test_stream_shipment
PO_STREAM=test_stream_order
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/track_trace/.env


#creating env file for product sevice
rm -f backend/products_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/products_service/.env


# creating env file for rbac_services
rm -f backend/rbac_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/rbac_service/.env

# creating env file for po_services
rm -f backend/po_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/po_service/.env

# creating env file for shipping order_service
rm -f backend/shippingOrder_service/.env
echo "MONGODB_URL=mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev
JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
JWT_TIMEOUT_DURATION=\"2 hours\"
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=dev@statwig.com
EMAIL_SMTP_PASSWORD=StaTwig@123
EMAIL_SMTP_SECURE=false
URL='http://abinbev.vaccineledger.com:9001/blockchainmanagement'
# LOGZ credentials
LOGZ_LEVEL='info'
LOGZ_NAME='winston_logzio'
LOGZ_TOKEN='XBTTpZlcmCHSFfrNIUPRKHRfxLwpPeTx'
LOGZ_HOST='listener.logz.io'" >> backend/shippingOrder_service/.env

