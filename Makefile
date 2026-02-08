IMAGE := goodbright-jekyll
PORT  := 9021
REPO  := utunga/goodbright

.PHONY: build serve shell clean

docker:
	docker build -t $(IMAGE) .

serve:
	docker run --rm -it \
	  -p $(PORT):4000 \
	  -v "$$PWD":/site \
	  -w /site \
	  $(IMAGE)

interact:
	docker run --rm -it \
	  -e PAGES_REPO_NWO=$(REPO) \
	  -v "$$PWD":/site \
	  -w /site \
	  $(IMAGE) \
	  bash

clean:
	docker rmi $(IMAGE) || true
