#!/bin/bash

#Chekcing arguments
if [ $# -eq 0 ]
  then
    echo "Please choose the mode: PROD TEST LOCAL"
    exit
fi

#Killing all the previous pm2 process
pm2 stop all
pm2 delete all

#Creating env variables
./pre-deploy.sh

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
echo "Building frontend"

cd frontend
if [ "$1" -eq "PROD" ] || [ "$1" == "TEST" ];
then
echo "Building frontend in $1 mode....."
sudo systemctl stop nginx
sudo rm -rf /var/wwww/html/dist /var/wwww/html/index.html
npm install
npm run build
cp -r dist /var/www/html/
cp index.html /var/wwww/html/
sudo systemctl start nginx
sudo systemctl status nginx
else
echo "Building and starting forntend in local mode...."
npm install
npm run build
npm start &
fi
cd ..

#start api gateway - traefik
killall traefik
cd apigateway
echo $(pwd)
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

echo $(pwd)
pm2 status
