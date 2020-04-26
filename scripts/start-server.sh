#!/bin/bash
service apache2 start
docker run --publish 8081:8081 --detach --name pigeon-backend tjzhou/pigeon:2.0