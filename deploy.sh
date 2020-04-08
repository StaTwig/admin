#!/bin/bash

for i in {0..9}
do
   echo "killing pm2 process with id $i "
   pm2 stop $i
done

cd backend
cd blockchain_service	
pm2 start index.js
cd ..

cd log_service		
pm2 start index.js
cd ..

cd shipping_service	
pm2 start index.js
cd ..

cd transaction_service
pm2 start index.js
cd ..

cd alert_service		
pm2 start index.js
cd ..

cd inventory_service	
pm2 start index.js
cd ..

cd notification_service	
pm2 start index.js
cd ..

cd track_trace
pm2 start index.js
cd ..
