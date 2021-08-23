# DIVOC
Open source digital platform for large scale vaccination and certification programs. Built for India scale.

## [Documentation](https://divoc.egov.org.in)

## [Discuss with community](https://github.com/egovernments/DIVOC/discussions)

## [Issue Reporting](https://github.com/egovernments/DIVOC/issues)


- This is the Release version [Generic1.23.3](https://github.com/egovernments/DIVOC/tree/1.23.3-generic)
- Test [Hosted](http://ec2-65-1-91-208.ap-south-1.compute.amazonaws.com/)

Steps to Deploy:

- [x] Install `Docker` and `Docker-compose` successful , check with ```docker-compose --version``` and make sure Docker service is up and running.
 
- [x] Go to DIVOC directory and run command 
```
 docker-compose -f docker-compose-release.yml up -d
```
- [x] Verify the state of containers. All containers should be up.
```docker-compose -f docker-compose-release.yml ps```

- [x] Some services might fail to start because the dependent service might not be ready yet. Restarting the failed service should start it successfully
```docker-compose up -f docker-compose-release.yml restart```
- [x] Look at the logs by ```docker-compose -f docker-compose-release.yml logs -f <service_name>```
- [x] For Continous look at logs 
```
docker-compose -f docker-compose-release.yml logs -f --tail 1
```

- [x] To build & recreate a service ```docker-compose -f docker-compose-release.yml up -d --build --force-recreate --no-deps <service_name>```
- [x] To enter Database Shell ```docker-compose -f docker-compose-release.yml exec db bash```
