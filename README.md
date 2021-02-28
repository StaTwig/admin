# Admin
Admin Website of StatLedger

The Backend is a collection of Microservices, Each Service is maintained as a Express NodeJS Server App in each seperate folder.
## MicroServices in consideration :
Address Service --> Manages Addresses of Organisations , Warehouses and Offices

Affiliation Service --> Manages Affiliation and affliates of Organisations and employees 

Intergation Service --> Mangaes Intergation of Users and organisations 

RBAC Service --> Role-based authentication Service

Employee Management Service --> Manages Employees in Organisations, offices and warehouses 

Configuration Service --> setup of Configuration of Statledger


## CI/CD
Docker -->  Docker Compose

## Deployment :
1) Login to server

2) Git pull -- Enter github deatils if prompted

3) ```
sudo docker-compose -f Docker-compose.yml build
```
Builds all the docker containers as images and caches ,the old ones

4) ```
sudo docker-compse -f Docker-compose.yml up -d
```
This is for running all services in as a daemon process

5) If wanted to see the logs(console) 
```
sudo docker-compse -f Docker-compose.yml up 
```
to exit 
```
Ctrl + c
```
This will exit all running docker images

6) To properlly stop all services 
```
sudo docker-compse -f Docker-compose.yml down
```