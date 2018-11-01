### FILE UPLOAD

The application consists of the back end part and front end part.

!note .env file is committed only for the demo, otherwise it would not be in git

#### BACKEND
BE is developed in symfony 4.1. The application is run via a docker container. To set up the application, docker needs to be installed on the machine.

- have ports 80 and 3308 free for nginx and mysql
- go to back-end folder
- run docker-compose up
- add 127.0.0.1 symfony.localhost to your hosts file
- run run docker ps - this gives you the list of containers
- run run exec {container id for php} composer install - this runs composer install on the docker machine
- run run exec {container id for php} php bin/console doctrine:schema:update --force - this creates the db structure

#### FRONTEND
FE is developed in react via CRA

- go to front-end folder
- run yarn 
- run yarn start

#### The Application

The application provides a simple FE for handle FILE UPLOAD CRUD. It enables to upload, delete and view any document.

#### TODO
 - Set maximum size to 15MB. PHP max file size was not adjusted so this needs to be configured to work correctly.
 - Refactor FE to use SAGAS everywhere
 - Increase test coverage to 100% on FE and BE

