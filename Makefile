IMG_NAME=josefdigital/platform:webcore-v0.0.1

docker_build:
	export DOCKER_DEFAULT_PLATFORM=linux/amd64 && docker build --no-cache --tag $(IMG_NAME) .

docker_build_mac:
	docker build --no-cache --tag $(IMG_NAME) .

docker_run:
	docker run --env-file ../../.env --rm -p 8081:8081 $(IMG_NAME)

docker_push:
	docker push $(IMG_NAME)

docker_remove:
	docker rmi $(IMG_NAME)
