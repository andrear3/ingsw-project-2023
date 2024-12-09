@echo off
echo Building Docker containers...
docker-compose build

echo Starting Docker containers...
docker-compose up

echo Docker Compose build and up completed successfully.
pause