#docker build -t api-check .
docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/rickcert/api-check . --push
