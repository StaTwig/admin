.PHONY: build-test-vl
build-test-vl:
	sudo docker-compose -f Docker-compose-VL-test.yml build

.PHONY: build-prod-vl
build-prod-vl:
	sudo docker-compose -f Docker-compose-VL-prod.yml build

.PHONY: build-test-ab
build-test-ab:
	sudo docker-compose -f Docker-compose-AB-test.yml build

.PHONY: build-prod-ab
build-prod-ab:
	sudo docker-compose -f Docker-compose-AB-prod.yml build

.PHONY: up-VL-test
up-VL-test:
	sudo docker-compose -f Docker-compose-VL-test.yml up -d

.PHONY: up-VL-prod
up-VL-prod:
	sudo docker-compose -f Docker-compose-VL-prod.yml up -d

.PHONY: up-AB-test
up-AB-test:
	sudo docker-compose -f Docker-compose-AB-test.yml up -d

.PHONY: up-AB-prod
up-AB-prod:
	sudo docker-compose -f Docker-compose-AB-prod.yml up -d

.PHONY : down
down:
	sudo docker-compose -f Docker-compose-AB-prod.yml down
	sudo docker-compose -f Docker-compose-AB-test.yml down
	sudo docker-compose -f Docker-compose-VL-prod.yml down
	sudo docker-compose -f Docker-compose-VL-test.yml down
