# theledger

New Vaccine Ledger 1.0


# Branch out from development, merge requests/pull requests shall be to development, no direct commits to development or master
# to understand branch policies and how to place the code in the proper directory, discuss with Thrienthra or Saathesh or Ash


# Ports for different services:
/usermanagement/ : 3001

/shipmentmanagement/ : 3002

/transactionmanagement/ : 3003

/alertmanagement/ : 3004

/tracttracemanagement/ : 3005

/notificationmanagement/ : 3006

/inventorymanagement/ : 3007

/blockchainmanagement/ : 3008

#Dependency:
1. NodeJS
2. [Traefik] (https://docs.traefik.io/getting-started/install-traefik/)
    2.1. [Windows](https://github.com/containous/traefik/releases/download/v2.1.9/traefik_v2.1.9_windows_amd64.zip)

    2.2. OsX : brew install traefik

    2.3. [Linux] (https://github.com/containous/traefik/releases/download/v2.1.9/traefik_v2.1.9_linux_amd64.tar.gz)
    


#How To run for development :

Step 1: [Recursive] go to each directory and run 
    * npm install
    * npm start

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



