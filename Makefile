.PHONY: build_be
build_be:
	docker build  -t vc-backend:latest -f ./apps/backend/Dockerfile .


.PHONY: run_be
run_be:
	docker run --env PORT=8101 -p 127.0.0.1:8101:8101 --rm vc-backend:latest
