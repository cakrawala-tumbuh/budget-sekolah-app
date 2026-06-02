# Makefile budget-app — perintah pengembangan & pengujian frontend.
#
# Jalankan `make test` untuk menjalankan unit test (jest).

.PHONY: help install test lint build dev clean

help: ## Tampilkan daftar perintah
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-12s %s\n", $$1, $$2}'

install: ## Pasang dependency (npm ci)
	npm ci

test: ## Jalankan unit test (jest)
	npm test

lint: ## Periksa gaya kode (eslint)
	npm run lint

build: ## Build produksi Next.js
	npm run build

dev: ## Jalankan server pengembangan
	npm run dev

clean: ## Hapus artefak build
	rm -rf .next coverage
