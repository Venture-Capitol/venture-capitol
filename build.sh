docker build  -t vc-fe:latest .
docker run -p 127.0.0.1:3000:3000 -v "$(pwd)"/apps/frontend:/app/apps/frontend vc-fe:latest