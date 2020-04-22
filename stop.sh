#!/bin/bash

pm2 stop all
pm2 delete all
pm2 status
killall traefik
sudo systemctl stop nginx

