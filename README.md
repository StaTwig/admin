# Admin
Admin Website of StatLedger

The Backend is a collection of Microservices, Each Service is maintained as a Express NodeJS Server App in each seperate folder.
## MicroServices in consideration :
Address Service → Manages Addresses of Organisations , Warehouses and Offices

Affiliation Service 	→ Manages Affiliation and affliates of Organisations and employees 

Intergation Service --> Mangaes Intergation of Users and organisations 

RBAC Service --> Role-based authentication Service

Employee Management Service --> Manages Employees in Organisations, offices and warehouses 

Configuration Service --> setup of Configuration of Statledger


## CI/CD
Docker -->  Docker Compose

- [x] Docker-compose.yml file has all the docker service configuration , Traefik routing rules and Loadbalancing.


- [x] All static configuration of Traefik is present in "traefik.toml" file


- [x] Dynamic Configuration is present in the file "traefik_dynamic.toml" 


- [x]  acme.json in the root folder is used the TLS Challenge LetsEncrypt for HTTPS in Traefik. Make sure that acme.json has Read and Write Permissions.


## Deployment :
1) Login to server

2) Git clone for fresh deployment or git pull to pull latest changes --> Enter github deatils if prompted

3) Run Dependency installer script to download Docker Engine , Docker Compose and create Docker Network named : Proxy

4) Build the images
```
sudo docker-compose -f Docker-compose.yml build
```
Builds all the docker containers as images and caches ,the old ones

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
