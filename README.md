# theledger

Vaccine Ledger

# Online Links

[Roadmap](https://gitlab.com/statwig-public/theledger/-/blob/development/docs/roadmap.png)

[SlackChannel](https://join.slack.com/t/statwig/shared_invite/zt-tau73hhe-o~~ill48n~5EfUs7r8OkRA)

[Wiki](https://gitlab.com/statwig-public/theledger/-/wikis/home)

[Issues](https://gitlab.com/statwig-public/theledger/-/issues)

# GitFlow

Branch out from `development` , Merge requests shall be to development, no direct commits to `development` or `master`

# Ports for different services:

|        Services        | Docker Port |
| :--------------------: | :---------: |
|     usermanagement     |    3001     |
|   shipmentmanagement   |    3002     |
|    alertmanagement     |    3004     |
|  tracktracemanagement  |    3005     |
| notificationmanagement |    3006     |
|  inventorymanagement   |    3007     |
|   productmanagement    |    3010     |
|     rbacmanagement     |    3011     |
|      pomanagement      |    3012     |
|    eventmanagement     |    3013     |
|  analyticsmanagement   |    3014     |
|   AdvancedAnalytics    |    3015     |
|   lastmilemanagement   |    3016     |

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

## Test Strategy for Vaccineledger

Our test strategy is a guideline to be followed to achieve the test objective and execution of test types mentioned in the testing plan. It deals with risk analysis, competency plans, and test objectives.
QA team ensures all the core functionality is tested every single day both Manually and Automation scripts.

## The QA team ensures that all the below points are addressed via test coverage.

1. ​​ We try to eliminate any functional defects at early stages.
2. Better business and functional scenario coverage.
3. Eliminate redundant test cases from the pool.
4. Try to discover any uncovered areas during daily brainstorming activities within the QA team.
5. Gain superior control over various business processes and tests accordingly.

## Techniques QA team following to ensure better test coverage.

1. Statement Coverage ensures that all the statements/Test cases in the source code/positive flow have been tested at least once a day. Hence It verifies what the written code is expected to do and not to do
2. Decision/Branch coverage ​​helps in covering both the true and false conditions which the QA team overlooks during statement coverage.
3. Path Coverage helps the QA team to reduce redundant tests and provides high test coverage since it covers all statements and branches in the code.
4. Condition Coverage helps the QA team in testing if both the outcomes(“true” or false”) of every condition. It measures the conditions independently of each other and has better sensitivity to the control flow.
5. Boundary Value Coverage Each and every user input field is validated with the upper and lower bounds. It helps us to avoid the scope of error due to invalid inputs and these errors occur at boundary values. During this coverage test cases are selected at the endpoints of the equivalence classes.

## Test automation approach

1. Identified set of complex, medium and simple test cases for VaccineLedger.
2. Identified regression set for automation - collaboration with business Analysts, statistical analysis of application logs for most used features
3. Prioritized identified automation test-set based on business impact into core and functional regression test suites
4. Prepared automation strategy and identification of Automation canonizations required.
5. Developed reusable components, automated test cases, test data sets and parameterizations.

## Automation Technology details

1. Open source tools / frameworks / add-ons / and utilities which include: Selenium-RC, TestNG, Java and Cucumber BDD framework.
2. Browser support includes: Firefox (1.5+), Internet Explorer (6.0 onwards), Edge and Google Chrome. Theoretically at least, any modern browser that supports JavaScript such as Safari (1.3+), Mozilla Suite (1.6+, 1.7+) and Opera (8) etc
3. OS support includes: Windows,Mac & Mobile (Android & iOS)

[ Software Test Plan for Vaccine Ledger 📃](https://docs.google.com/document/d/1jwXpneiggd7duiuxSUVbNvjywzQH0a7d1QBHnXM58NQ/edit#heading=h.31ne2bdq483w)
