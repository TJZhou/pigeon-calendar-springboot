#!/bin/bash
set -e

cd backend
mvn clean install
docker build --tag tjzhou/pigeon:2.0 .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push tjzhou/pigeon:2.0
cd ..