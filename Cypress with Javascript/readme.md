# Prerequisite:

* NodeJS installed (what version?)

# How to install:

* run `npm install` in the main directory of the project


## How to open Cypress and run a test visually:

* in terminal : npx cypress open
* select E2E Testing in the Cypress window
* select browser Chrome or Electron and click start

## How to add a new shop credentials

* go to  fixtures/credentials.json 
* you need to add the uniqueID of the shop wich you can find it in the url 
* to be able to run all suite of tests you need to add the following : username, password, shop_unique, shop_name, currency, billing_plan
* then add for specific if the shop has the following : marketplace, sendgrid integration, klaviyo integration, api_keys 

## How to run all tests in parralel: 

* `npm run cy.parallel`

## How to run all tests in parralel for Reveal Stage for Automation Shop:  
* In package.json update the command for cy.parralel
* ex: "CYPRESS_shopId=61d018 CYPRESS_automation=true cypress-parallel -t 3 -s test -d 'Critical_flow'"

## How to run specific test in terminal?

* npx cypress run --spec  "Critical_flow/folder_name/spec_name.js"
* ex : npx cypress run --spec  "Critical_flow/01.Dashboard/Main_calendar.js"

## How to run all tests in a folder?

* npx cypress run --spec  "Critical_flow/folder_name
* ex : npx cypress run --spec  "Critical_flow/01.Dashboard"

## How to run tests on my local Reveal :

* TODO

## How to run tests on Reveal production(live):

* to run tests for demo01 live you have to run the normal command
* to run for a different shop go to "fixtures/credentials.json" and check for shopID, if is not there you have to update the folder with the id and credentials 
* in terminal, add --env ShopID=UniqueId to the end of the command
* for cy.parralel add: CYPRESS_shopId=UniqueId

## How to run tests in Test Runner on Reveal Stage:

* to run all tests available you have to add at the end of command --env automation=true
* ex: npx cypress open --env shopId=61d018,automation=true

## How to run data comparison for the API Suite :
* in pachakge.json you have a command to run "API_Get_Responses" for the shop you need
* at the moment we have only demo01 and demo01Stage setup ready
* this command will create in the folder Responses a file for each endpoint response
* you have to run this command in master to have the setup ready
* move to the branch you need to the test and then run from package.json "API_Compare_Data"

## How to run tests in Currents : 

* in terminal `npm run currents:tests:paralel --build={yyyymmddhhmm}`, [yearmonthdatehourminute]
* go to https://app.currents.dev/ 
* Reveal -> Runs : to see the results of the run 

## How to run snapshot tests with Percy on Reveal(Stage):

* Percy website: https://percy.io/d603aef9/reveal-qa-automation
* token: you need to export the token before running the next command , you can find it in 1password
* one spec : npx percy exec -- cypress run --spec "Snapshot_Testing/snapshot_dashboard."
* run all : npx percy exec -- cypress run --spec "Snapshot_Testing"

### Cypress Documentation :

* https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn