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


#start frontend


#start api gateway - traefik

#How to run trafeik in background as per the environment e.g. ./deploy.sh prod web or ./dploy prod mobile or iot
