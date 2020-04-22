#!/bin/bash


#Installing nginx
sudo apt update
sudo apt install -y nginx

#Installing Traefik
wget https://github.com/containous/traefik/releases/download/v2.2.0/traefik_v2.2.0_linux_amd64.tar.gz
tar -xvf traefik_v2.2.0_linux_amd64.tar.gz
sudo mv traefik /usr/bin/
rm traefik_v2.2.0_linux_amd64.tar.gz
rm CHANGELOG.md LICENSE.md traefik

#Installing Node Js
wget https://nodejs.org/dist/v12.16.2/node-v12.16.2-linux-x64.tar.xz
tar -xvf node-v12.16.2-linux-x64.tar.xz
mv node-v12.16.2-linux-x64 node
echo "PATH=$PATH:/home/ubuntu/node/bin" >> .bashrc
source .bashrc
npm install pm2 -g
rm -rf node-v12.16.2-linux-x64.tar.xz



#Installing build essentials
sudo apt-get install build-essential -y