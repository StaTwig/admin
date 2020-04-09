#!/bin/bash

#Killing all the previous pm2 process
pm2 stop all
pm2 delete all
#starting backend services
cd backend

cd -P .
for dir in ./*/
do cd -P "$dir" ||continue
   printf %s\\n "$PWD" >&2
   npm install && pm2 start && cd "$OLDPWD" || 
! break; done || ! cd - >&2

cd ..
echo $(pwd)
#start frontend


#start api gateway - traefik
killall traefik
cd apigateway
if [ "$1" == "PROD" ];
then
echo "Starting traefik in PROD mode ......"
traefik --configFile=traefik-cloud-prod-api.yml &
elif [ "$1" == "TEST" ];
then
echo "Starting traefik in TEST mode ......"
traefik --configFile=traefik-cloud-dev-api.yml &
else
echo "Starting traefik in DEV mode ......"
traefik --configFile=traefik-local-dev-api.yml &
fi
cd ..
