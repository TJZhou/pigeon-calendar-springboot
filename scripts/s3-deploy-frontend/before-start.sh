#!/bin/bash

# if directory exists then do backup otherwise create new directory
if [ -d "/var/www/calendar" ]; then 
    tar -czvf /var/www/calendar-frontend-backup.tar.gz /var/www/calendar
else  
    mkdir /var/www/calendar
fi
rm -rf /var/www/calendar/*