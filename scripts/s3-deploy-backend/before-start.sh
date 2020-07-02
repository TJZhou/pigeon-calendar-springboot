#!/bin/bash

DIRECTORY=/var/backend/calendar
FILE=/var/backend/calendar/pigeon-0.0.1-SNAPSHOT.jar

# Make directory if not exists
if [ ! -d "$DIRECTORY" ]; then 
    mkdir $DIRECTORY
fi

# Archive previous file if exists
if test -f "$FILE"; then
    tar -czvf /var/backend/calendar/pigeon-0.0.1-SNAPSHOT.tar.gz $FILE
    pid=$(ps -ef | grep [p]igeon | awk '{print $2}')
    kill -9 $pid
    rm -rf $FILE
fi