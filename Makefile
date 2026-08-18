IMAGE := goodbright-jekyll
NAME  := goodbright-serve
PORT  ?= 9021
REPO  := utunga/goodbright

.DEFAULT_GOAL := help

.PHONY: help check-docker image docker serve build preview stop shell interact clean clean-image

help:
	@echo "Local preview of goodbright.nz (needs Docker Desktop or OrbStack running)"
	@echo
	@echo "  make serve        build the image if needed, then serve on http://localhost:$(PORT)"
	@echo "                    (live reload: edit a file, refresh the browser)"
	@echo "  make serve PORT=9022   same, on a different port"
	@echo "  make build        one-off build of the site into ./_site (no server)"
	@echo "  make preview      serve an already-built ./_site with python3, no Docker"
	@echo "  make stop         stop a serve container left running in the background"
	@echo "  make shell        bash prompt inside the image, site mounted at /site"
	@echo "  make image        force a rebuild of the Docker image (after Gemfile changes)"
	@echo "  make clean        delete ./_site"
	@echo "  make clean-image  delete the Docker image as well"

# Fail early with a readable message instead of a wall of Docker output.
check-docker:
	@docker info >/dev/null 2>&1 || { \
	  echo "Docker doesn't seem to be running."; \
	  echo "Start Docker Desktop (or OrbStack) and try again — 'docker info' should succeed."; \
	  exit 1; \
	}

image: check-docker
	docker build -t $(IMAGE) .

# old name, kept so muscle memory still works
docker: image

serve: check-docker
	@docker image inspect $(IMAGE) >/dev/null 2>&1 || $(MAKE) image
	@docker rm -f $(NAME) >/dev/null 2>&1 || true
	@if lsof -nP -iTCP:$(PORT) -sTCP:LISTEN >/dev/null 2>&1; then \
	  echo "Port $(PORT) is already in use (another serve running?)."; \
	  echo "Either 'make stop', or pick another port: make serve PORT=9022"; \
	  exit 1; \
	fi
	@echo "Serving on http://localhost:$(PORT)  (ctrl-c to stop)"
	@docker run --rm $$(test -t 0 && echo -it) \
	  --name $(NAME) \
	  -p $(PORT):4000 \
	  -v "$$PWD":/site \
	  -w /site \
	  $(IMAGE)

build: check-docker
	@docker image inspect $(IMAGE) >/dev/null 2>&1 || $(MAKE) image
	docker run --rm \
	  -v "$$PWD":/site \
	  -w /site \
	  $(IMAGE) \
	  bundle exec jekyll build --config _config.yml,_config.dev.yml

# No Docker? This serves whatever is already in ./_site. Static only —
# it won't pick up edits until you 'make build' again.
preview:
	@test -d _site || { echo "No ./_site yet — run 'make build' first (needs Docker)."; exit 1; }
	@echo "Serving ./_site on http://localhost:$(PORT)  (ctrl-c to stop)"
	@python3 -m http.server $(PORT) --directory _site

stop:
	@docker rm -f $(NAME) >/dev/null 2>&1 && echo "Stopped $(NAME)." || echo "Nothing named $(NAME) was running."

shell: check-docker
	@docker image inspect $(IMAGE) >/dev/null 2>&1 || $(MAKE) image
	docker run --rm -it \
	  -e PAGES_REPO_NWO=$(REPO) \
	  -v "$$PWD":/site \
	  -w /site \
	  $(IMAGE) \
	  bash

interact: shell

clean:
	rm -rf _site

clean-image:
	docker rmi $(IMAGE) || true
