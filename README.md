# theledger

Vaccine Ledger 1.0

# Online Links:

[Roadmap](https://trello.com/b/DCItcgrQ/statwig-product-roadmap)

[SlackChannel](https://join.slack.com/t/statwig-group/shared_invite/zt-flzyf6ci-giVkco5NmdvZjVuO85~dlw)

[Wiki](https://gitlab.com/statwig-public/theledger/-/wikis/home)

[Issues](https://gitlab.com/statwig-public/theledger/-/issues)


# GitFlow
Branch out from development, merge requests/pull requests shall be to development, no direct commits to development or master


# Ports for different services:
| services | http port | https port |
|:---------:|:---------:|:----------:|
| usermanagement|  3001 | 4001|
|shipmentmanagement| 3002| 4002|
|transactionmanagement |  3003 | 4003|
| alertmanagement| 3004 | 4004|
| tracttracemanagement|  3005 | 4005|
|notificationmanagement| 3006 | 4006|
|inventorymanagement| 3007| 4007|
|blockchainmanagement| 3008| 4008|
|productmanagement| 3010| 4010|


# Dependencies:
<!-- 1. NodeJS

2. [Traefik] (https://docs.traefik.io/getting-started/install-traefik/)
    2.1. [Windows](https://github.com/containous/traefik/releases/download/v2.1.9/traefik_v2.1.9_windows_amd64.zip)

    2.2. OsX : brew install traefik

    2.3. [Linux] (https://github.com/containous/traefik/releases/download/v2.1.9/traefik_v2.1.9_linux_amd64.tar.gz)
    


# How To run for development :

Step 1: [Recursive] go to each directory and run 
```
    * npm install
    * npm start
```
Step 2: go to apigateway
    
    * traefik --configFile=traefik-(environment)-(platform)-(target).yml
    environment - dev , prod
    platform - cloud, local
    target - api, mobile
    
Step 3: in browser open 

    * localhost:3000

OR

Step 4: without frontend / i.e. with postman or insomania or script

    * localhost:9001 -->

1. Docker
2. Docker-compose

These Dependencies can be installed by running Dependencyinstaller.sh 



## Deployment Strategy:
Docker -->  Docker Compose

- [x] Docker-compose.yml file has all the docker service configuration , Traefik routing rules and Loadbalancing.


- [x] All static configuration of Traefik is present in "traefik.toml" file


- [x] Dynamic Configuration is present in the file "traefik_dynamic.toml" 


- [x]  acme.json in the root folder is used the TLS Challenge LetsEncrypt for HTTPS in Traefik. Make sure that acme.json has Read and Write Permissions.


## Deployment Steps:
1) Login to server

2) Git clone for fresh deployment or git pull to pull latest changes

3) Run Dependency installer script to download Docker Engine , Docker Compose and create Docker Network named : Proxy

4) Build the images
```
sudo docker-compose -f Docker-compose.yml build
```
Builds all the docker containers as images and docker can caches the old ones

5) 
```
sudo docker-compse -f Docker-compose.yml up -d
```
Running all services in as a daemon process

6) If wanted to see the logs(console) 
```
sudo docker-compse -f Docker-compose.yml up 
```
to exit 
```
Ctrl + c
```
This will exit all running docker images

7) To properlly stop all services 
```
sudo docker-compse -f Docker-compose.yml down
```



