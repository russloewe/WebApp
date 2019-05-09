# WebApp
Basic Web Application using Nodejs, Express, Passport, Postrgesql, Webpack, React, and Redux.
Testing with Mocha and Chai.

## Sever Setup

### Configuration Files

Fill in the appropiat values and copy the following configuation files:

The settings for the webserver:

    ./settings.js.example -> ./settings.js
    
The Ubuntu systemctl script

    ./webapp.service -> /etc/systemd/system/webapp.service

### PSQL

Set up and install a PSQL server. First fill in the {variable} in 
db_scheme.template.sql and save as:

    ./db_scheme.template.sql -> ./db_scheme.sql
    
Second, run the command to create the an empty database for the 
server in the SQL database.

    sudo -u postgres psql -c '\i ./config/db_scheme.sql'

### Install NodeJS

Install nvm see https://github.com/creationix/nvm 

Install node

	nvm install node




### WebApp Setup
    
Install modules

    cd WebApp
    npm install
    
Setup settings by copying settings.json.example to settings.json and filling
and change the values.

Run the server tests

    npm run test

Create the javascript bundle and CSS files

    ./load.sh -w -c

    sudo systemctl start webapp

### SSL

If using the SSL option, save the SSL certificates in ./ssl folder

## Customize


Change CSS for desktop

    /public/stylsheets/styl.css
    
Chang CSS for mobile

    /public/stylsheets/styl_mobil.css
