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

COMPOSE_E2E = docker compose -f docker-compose.e2e.yml

.DEFAULT_GOAL := test
.PHONY: build lint unit test clean install dev build-app \
        e2e-up e2e e2e-down help

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

## e2e-up: hidupkan backend + app + seed, tunggu sampai semua healthy
e2e-up:
	$(COMPOSE_E2E) up --build -d --wait
	@echo ""
	@echo "Service berjalan:"
	@echo "  Backend → http://localhost:18000  (docs: http://localhost:18000/docs)"
	@echo "  App     → http://localhost:3099"

## e2e: hidupkan service lalu jalankan playwright dari host
e2e: e2e-up
	npx playwright test

## e2e-down: hentikan semua service dan hapus volume
e2e-down:
	$(COMPOSE_E2E) down -v

## help: tampilkan daftar perintah
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed -e 's/## //'
