# dwp-skil-test
# Welcome to the DWP Skill Test NodeJS REST API !

## Instructions to run this project and access the Swagger
* download the project
* In home directory run the below command to install npm libraries and start the server
* Run below command to start the server
> npm start 
This command asks for the PORT that this app has to listen to on and starts the server on the given port. Please give unused PORT number.
* Open Swagger @ http://localhost:<Given PORT from the above command>/api

## Instructions to run app on Docker
* Install Docker on your desktop and run below commands to perform docker build and run the application
> docker build -t <your docker user id>/node-web-app .

> docker run -p 8080:8080 -d <your docker user id>/node-web-app
* Open Swagger @ http://localhost:8080/api

