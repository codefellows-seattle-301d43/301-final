# Code 301 Final Project "Med Words" (version 1.0.0)

**Team Members** - Aaron Frank, Jeff Weng, Kendra Ellis, Tre Cain

**Deployed Site**: (http://medwords.info/)

>### Project Description
insert description

>### Problem Domain
Electronic Medical Records, Patient History Information Transfer, Knowledge Extraction, Natural Language Processing

>### Requirements
*"dotenv": "^6.0.0",
*"ejs": "^2.6.1",
*"express": "^4.16.3",
*"method-override": "^3.0.0",
*"pg": "^7.4.3",
*"superagent": "^4.0.0-beta.5"*

>### How To Use Our App
Development: Create a Node instance and clone the repo.
As a User: Navigate to (http://medwords.info/), select a patient or create a new patient, create or view a patient's records, send those records off for key phrase analysis and view the key phrases.

>### Database Schema
insert schema

>### API and Site Endpoints
* **GET /** - This route takes you to our index
* **GET /about** - This route takes us to the about us page
* **GET /patient/:patientId** - This route will take you a patient's details
* **GET /record/:recordId** -  This route will take you to a patient's record details
* **GET /patient/:patientId/analyze** - This route will give keywords from all of the patient's records
* **POST /patient** - Insert a new patient to database and redirect to patient details page and give success message
* **POST /record** - This route will insert a new record into the database
* **DELETE /patient/:patientId** - This route will delete a patient and their records from the database
* **DELETE /record/:recordId** - This route will delete a record from the database

>### Credits and Collaborations
put those here
