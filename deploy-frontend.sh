#!/bin/bash

set -e

cd frontend
npm install
ng build --prod
cd ..
mkdir -p deploy_folder
zip deploy_folder/calendar.zip frontend/dist/calendar/*

