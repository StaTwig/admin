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
1. NodeJS

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

    * localhost:9001



