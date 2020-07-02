#!/bin/bash

set -e

function printhelp() {
    echo "Usage: ./app <command> <database password>"
    echo "Available commands: "
    echo "   (b)uild-(b)ackend:         builds backend (skip tests/assembly)"
    echo "   (b)uild-(f)rontend:        builds frontend (skip tests/assembly)"
    echo "   (t)est-(b)ackend:          unit tests backend"
    echo "   (t)est-(f)rontend:         unit tests frontend via maven executing ember"
    echo "   (s)tart-(f)rontend:        start ember server"
    echo "   (s)tart-(b)ackend:         start backend serve"
    echo "   (p)ackage-(f)rontend:      package frontend /dist folder and s3 deployment script"
    echo "   (p)ackage-(b)ackend:       package backend jar file and s3 deployment script"
}

COMMAND=$1
MAVEN_CLI_OPTS="-Dspring.data.mongodb.uri=mongodb+srv://tjzhou:${2}@pigeon-f4oyb.mongodb.net/test?retryWrites=true&w=majority"

if [ -z $COMMAND ]; then
  printhelp
fi

if [[ $COMMAND == "bb" || $COMMAND == "build-backend" ]]; then
  echo "building backend..."
  cd backend
  mvn clean package -Dmaven.test.skip=true $MAVEN_CLI_OPTS
  cd ..

elif [[ $COMMAND == "bf" || $COMMAND == "build-frontend" ]]; then
  echo "building frontend..."
  cd frontend
  npm install
  cd ..

# make sure test and start command is called after building
elif [[ $COMMAND == "tb" || $COMMAND == "test-backend" ]]; then
  echo "testing backend..."
  cd backend
  mvn test $MAVEN_CLI_OPTS
  cd ..

elif [[ $COMMAND == "tf" || $COMMAND == "test-frontend" ]]; then
  echo "testing frontend..."
#   cd frontend
#   ng test
#   cd ..

elif [[ $COMMAND == "sb" || $COMMAND == "start-backend" ]]; then
  echo "starting backend..."
  cd backend
  mvn spring-boot:run $MAVEN_CLI_OPTS
  cd ..

elif [[ $COMMAND == "sf" || $COMMAND == "start-frontend" ]]; then
  echo "starting frontend..."
  cd frontend
  ng serve
  cd ..

elif [[ $COMMAND == "pf" || $COMMAND == "package-frontend" ]]; then
  echo "packaging frontend..."
  cd frontend
  npm install -g @angular/cli@7.3.7
  ng build --prod
  zip -r -j calendar-frontend.zip ./dist/calendar
  cd ..
  zip -r -j ./frontend/calendar-frontend.zip ./scripts/s3-deploy-frontend
  mkdir deploy-folder-frontend
  mv ./frontend/calendar-frontend.zip deploy-folder-frontend

elif [[ $COMMAND == "pb" || $COMMAND == "package-backend" ]]; then
  echo "packaging backend..."
  cd backend
  zip -j calendar-backend.zip ./target/pigeon-0.0.1-SNAPSHOT.jar
  cd ..
  zip -r -j ./backend/calendar-backend.zip ./scripts/s3-deploy-backend
  mkdir deploy-folder-backend
  mv ./backend/calendar-backend.zip deploy-folder-backend
else
  echo "Unknown command: $COMMAND"
  printhelp
fi
