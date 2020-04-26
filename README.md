# Online Task Planner_Pigeon Calendar


## Technologies:

### Frontend: 
    Angular 7, Moment.js, Scss

### Backend:
    Spring Boot, MongoDB, JWT, RESTFul API, Docker

### CI/CD:
    AWS EC2, AWS S3, Travis CI, AWS CodeDeploy, AWS CodePipeline

## How to run:
### 0. Clone the repository
### 1. Frontend
    1.1 Run command `cd frontend` to change directory to frontend
    1.2 Run command `npm install`
    1.3 Run command `ng serve -o` to start front end server
    1.4 Run command `ng build --prod` to build frontend
### 2. Backend
    2.1 Import backend into IDE and start backend server
    2.2 Run command `mvn clean` to build backend into jar file
### 3. Docker
    3.1 Run command `docker build --t <repository>/<iamge-name>:<version> . ` to build docker image
    3.2 Run command `docker push <repository>/<iamge-name>:<version>` to push docker image to docker repository
    3.3 Run command `docker pull <repository>/<iamge-name>:<version>` to pull latest docker image from docker repository
    3.4 Run command `docker run --publish <port>:<port> --detach --name <name> <repository>/<iamge-name>:<version>` to start backend server in docker container 

## Contributors:
    Rui Yang, Yujun Xie, Yuanxin Zhang, Tianju Zhou