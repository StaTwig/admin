# Admin

Admin Website of StatLedger

The Backend is a collection of micro-services, Each Service is maintained as a Express NodeJS Server App in each separate folder.

## MicroServices in consideration

Address Service → Manages Addresses of Organizations , Warehouses and Offices

Affiliation Service → Manages Affiliation and affiliates of Organizations and employees

Integration Service --> Manages Integration of Users and organizations

RBAC Service --> Role-based authentication Service

Employee Management Service --> Manages Employees in Organizations, offices and warehouses

Configuration Service --> setup of Configuration of Statledger

## CI/CD

Docker --> Docker Compose

- [x] Docker-compose.yml file has all the docker service configuration , Traefik routing rules and load balancing.

- [x] All static configuration of Traefik is present in "traefik.toml" file

- [x] Dynamic Configuration is present in the file "traefik_dynamic.toml"

- [x] acme.json in the root folder is used the TLS Challenge LetsEncrypt for HTTPS in Traefik. Make sure that acme.json has Read and Write Permissions.

## Deployment

- Login to server

- Git clone for fresh deployment or git pull to pull latest changes --> Enter github details if prompted

- Run Dependency installer script to download Docker Engine , Docker Compose and create Docker Network named : Proxy

- Build the images

```bash
sudo docker-compose -f Docker-compose.yml build
```

Builds all the docker containers as images and caches ,the old ones

-

```bash
sudo docker-compose -f Docker-compose.yml up -d
```

Running all services in as a daemon process

If wanted to see the logs(console)

```bash
sudo docker-compose -f Docker-compose.yml up
```

to exit

```bash
Ctrl + c
```

This will exit all running docker images

- To properly stop all services

```bash
sudo docker-compose -f Docker-compose.yml down
```
