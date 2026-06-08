################################################################################
# Makefile budget-app — perintah pengembangan & pengujian frontend.
#
# Gate test (lint + unit) berjalan DALAM Docker via Dockerfile.test.
# Perintah yang sama (`make test`) dipakai di LOKAL maupun di GitHub Actions.
# Tidak ada artefak test (coverage/, node_modules lokal, dll) yang tertulis
# ke folder project karena source di-COPY ke image, bukan bind-mount.
################################################################################

IMAGE_NAME ?= $(shell basename $(CURDIR))-test
DOCKERFILE  = Dockerfile.test
DOCKER_RUN  = docker run --rm $(IMAGE_NAME)

.DEFAULT_GOAL := test
.PHONY: build lint unit test clean install dev build-app help

## build: bangun image test (Dockerfile.test)
build:
	docker build -f $(DOCKERFILE) -t $(IMAGE_NAME) .

## lint: jalankan eslint di dalam container
lint: build
	$(DOCKER_RUN) npm run lint

## unit: jalankan jest di dalam container
unit: build
	$(DOCKER_RUN) npm test -- --ci

## test: gate lengkap = lint + unit. Dipakai LOKAL dan CI (identik).
test: lint unit

## clean: hapus image test
clean:
	-docker rmi $(IMAGE_NAME)

## install: pasang dependency (untuk development lokal)
install:
	npm ci

## dev: jalankan server pengembangan
dev:
	npm run dev

## build-app: build produksi Next.js
build-app:
	npm run build

## help: tampilkan daftar perintah
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed -e 's/## //'
