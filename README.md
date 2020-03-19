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


#How To run for development :
Step 1: [Recursive] go to each directory and run 
    * npm install
    * npm start
Step 2: go to apigateway
    * traefik --configFile=traefik.yml
Step 3: in browser open 
    * localhost:3000
OR
Step 4: without frontend / i.e. with postman or insomania or script
    * localhost:9001