#!/bin/bash
docker stop pigeon-backend
docker rm pigeon-backend
docker rmi tjzhou/pigeon:2.0
docker pull tjzhou/pigeon:2.0