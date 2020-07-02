#!/bin/bash

cd /var/backend/calendar

nohup java -jar pigeon-0.0.1-SNAPSHOT.jar \
--spring.config.additional-location=/var/backend/properties/application-calendar.properties \
>/dev/null 2>&1 &