# theledger

Vaccine Ledger

# Online Links:

[Roadmap](https://trello.com/b/DCItcgrQ/statwig-product-roadmap)

[SlackChannel](https://join.slack.com/t/statwig/shared_invite/zt-tau73hhe-o~~ill48n~5EfUs7r8OkRA)

[Wiki](https://gitlab.com/statwig-public/theledger/-/wikis/home)

[Issues](https://gitlab.com/statwig-public/theledger/-/issues)

# GitFlow

Branch out from `development` , Merge requests shall be to development, no direct commits to `development` or `master`

# Ports for different services:

|        Services         | Docker Port |
| :---------------------: | :---------: |
|     usermanagement      |    3001     |
|   shipmentmanagement    |    3002     |
|     alertmanagement     |    3004     |
|  tracktracemanagement   |    3005     |
| notificationmanagement  |    3006     |
|   inventorymanagement   |    3007     |
|  blockchainmanagement   |    3008     |
|    productmanagement    |    3010     |
|     rbacmanagement      |    3011     |
|      pomanagement       |    3012     |
| shippingordermanagement |    3013     |
|     eventmanagement     |    3014     |
|   analyticsmanagement   |    3015     |
|    AdvancedAnalytics    |    3016     |
|   lastmilemanagement    |    3017     |

# Flow

**Browser** / **Client** ---> **traefik** ---> **Services**

Frontends also is a service , a docker container of nginx serving the files

Images are Served from S3 private bucket

# Dependencies:

1. Docker
2. Docker-Compose

Dependencies can be installed by running `dependencyinstaller.sh`

## Deployment Strategy:

**Docker with Docker Compose**

- [x] Every Service has a Dockerfile in its root folder, which reflects in building that Docker Image.

- [x] Docker-compose.yml file present in root of Repository has all the docker service configuration , Traefik routing rules and Loadbalancing.

- [x] There are multiple versions of Docker-compose-_-_.yml for partiucular deployments

- [x] All static configuration of Traefik is present in "traefik.toml" file

- [x] Dynamic Configuration is present in the file "traefik_dynamic.toml" . Security Configuration is also included

* Important

- [x] acme.json in the root folder is used the TLS Challenge LetsEncrypt for HTTPS in Traefik. Make sure that acme.json has Read and Write Permissions.

- If acme.json doesn't exit:

- [x] Create a file, by `touch acme.json`

- [x] Permission to file , `sudo chmod 600 acme.json`

## Deployment Steps:

1. Login to server

2. Git clone for fresh deployment or git pull to pull latest changes

3. Run Dependency installer script to download Docker Engine , Docker Compose and create Docker Network named : Proxy

4. Create a folder `env`

```
mkdir env
```

Add a file `ledger.env` with the environment varibles

5. Build the images

```
docker-compose -f Docker-compose.yml build
```

Builds all the docker containers as images and docker can caches the old ones

All new built images are tagged with `latest` tag

6.

```
docker-compse -f Docker-compose.yml up -d
```

Running all services in as a daemon process

6. If wanted to see the logs(console) / Run process in Foreground

```
docker-compse -f Docker-compose.yml up
```

to exit `Ctrl + c` will exit all running docker images.

- Important - Make sure to run before starting the services up again, for preventing any un-ordinary behaviour

```
docker-compse -f Docker-compose.yml down
```

7. To properlly stop all services

```
docker-compse -f Docker-compose.yml down
```

**Note:**

1. To remove Previous Build images

```
docker image prune -a
```

2. To clear build cache

```
docker builder prune -a
```

## Run Docker commands without sudo

1. Add the docker group if it doesn’t already exist

```
$ sudo groupadd docker
```

2. Add the connected user $USER to the docker group. Optionally change the username to match your preferred user.

```
$ sudo gpasswd -a $USER docker
```

**IMPORTANT**: Log out and log back in so that your group membership is re-evaluated. 3. Restart the `docker` daemon

```
$ sudo service docker restart
```

## Notice :

- Don't store any data that needs to be persistent in the services, as docker containers are volatile and data can be lost , for every docker image restart / New start

- We are not binding an Volume to docker containers

## Working with Redis

To connect to Redis Instance

```bash
redis-cli -h <Hostname> -a StaTwig2021
```

## References

- Docker & Docker compose :

[Docker Offical Documentation 📄](https://docs.docker.com)

[Digital Ocean - Docker Article 📃](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)

[Docker Handbook 📒](https://www.freecodecamp.org/news/the-docker-handbook)

- Traefik :

[Offical Traefik Docs 📄](https://doc.traefik.io/traefik/)

[Digital Ocean Docker Traefik HTTPS Setup ✅](https://www.digitalocean.com/community/tutorials/how-to-use-traefik-v2-as-a-reverse-proxy-for-docker-containers-on-ubuntu-20-04)

[ Traefik Article 📃](https://traefik.io/blog/traefik-2-0-docker-101-fc2893944b9d/)
