#!/bin/bash

#Killing all the previous pm2 process
pm2 stop all
#starting backend services
cd backend

cd -P .
for dir in ./*/
do cd -P "$dir" ||continue
   printf %s\\n "$PWD" >&2
   npm install && pm2 start index.js && cd "$OLDPWD" || 
! break; done || ! cd - >&2
#How to run trafeik in background as per the environment e.g. ./deploy.sh prod web or ./dploy prod mobile or iot
