# Cypress - Cucumber Synaptic Portal UI Automation test

## Prereqisite

- Node.js 12 or 14 and above
- Install npm 


## Installing Project from Code repository

- Clone repo
- Go to project Directory

Run following command:

- npm install

## Installing Project from Bamboo Build Link

- Download package.zip from bamboo build link
- Unzip
- Go to package folder

Run following command:

-  npm install --registry=https://registry.npmjs.org/

## Code Structure

- cypress/e2e/synaptic-portal : Contains customer spesific feature file.
- cypress/pages/synaptic-portal : Contains synaptic portal specific pages and its implementaion.
- cypress/e2e/step_definitions : Contains all feature wise step definition file.

Run Test Case using Following Command (It will run test on 10.91.10.183 if we pass value as baseUrl=http://10.91.10.183/):

- Here currently below tag is present to run regression suite for UBP -
- @e2e-synaptic

## Before commit check code syntax and error using below command:

- yarn eslint --fix cypress

## Warning

In cypress.json you can check the "chromeWebSecurity" property disabled. Please, do not use it
unless you know what it does. This is done right now to make the "feel-lucky" feature to work.

## Run specific cucumber scenario from a feature file during development.

In cypress.json add ==>
"env": {
"TAGS": "@run"
}

- Example:
  In feature file mention same tag against scenario.
  @e2e-synaptic @run
  Scenario Outline: Performing Edit Account type operation for existing Account Type

## In order to check performace

Go to any step_definitions/page file and write below command
cy.checkPerformance();

## In order to generate Cucumber HTML report follow below steps

threads=2 tag=@e2e-seamless-one-std baseUrl=http://10.91.11.117/ apihost=10.91.11.117 dbhost=10.91.11.117 CYPRESS_lighthouse=false npm run test:cucumber
## In order to generate a build in ZIP format run below command

- npm run build
1. login in centos VM
2. install node and npm by executing following commands
   sudo yum install -y nodejs
   node --version
   npm --version
3. install chrome browser using below commands
   wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
   sudo yum install ./google-chrome-stable_current_*.rpm
4. if you faced error related to Xvfb dependancy , run below command. It is used to run test cases in headless mode.
   yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
5. go to http://bamboo.dev.ts/browse/MOD-UN
6. download latest package in local system
7. move above download package from local system to centos VM
   scp package-28.zip root@10.91.10.124:/home/uiAutomation
8. In centos VM , locate to package folder, unzip folder and install all the project related dependancies using below   command 
   unzip -qa package-28.zip 
   npm install
9. run test cases and generate html report 
   tag=@e2e-synaptic baseUrl=http://10.91.10.124/ CYPRESS_lighthouse=false npm run test:cucumber (please provide appropriate baseUrl and tag)
   if test case requires API connection and DB connection , please change hostname and host in cypress.json before execution.


##  In order to execute testcases using docker
1. create docker image
      docker build --platform linux/arm64 -t ubp-test .  (for VM execution : docker build --platform linux/amd64 -t ubp-test . )

      #push docker image to dockerhub
      docker tag docker.io/library/gp-test sdsdockerhub/ubp-test
      docker push sdsdockerhub/ubp-test

2. create below directories in local 
      mkdir -p /var/synaptic/log/ss-ui-automation/cypress/reports

3. run docker image
      docker run gp-ui /bin/bash -c "threads=2 tag=@e2e-synaptic baseUrl=http://10.91.11.117/ apihost=10.91.11.117 dbhost=10.91.11.117 CYPRESS_lighthouse=false npm run cypress:parallel && npm run node:cucumber || npm run node:cucumber && ./reportServer.sh"
