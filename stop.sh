#!/bin/bash

for i in {0..9}
do
   echo "killing pm2 process with id $i "
   pm2 stop $i
done

pm2 status
