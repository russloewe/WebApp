# WebApp
Basic Web Application using nodejs, express, passport, postrgesql, webpack, react, and redux.

## Sever Setup

First install and set up a postgre server. Create user role and database
www and add table for users:

    CREATE DATABASE yourdbname;
    CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
    GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;

    CREATE TABLE account(
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    passsalt VARCHAR (20) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
    );

Next install nvm see https://github.com/creationix/nvm 

## WebApp Setup

Get source.

    git clone https://github.com/russloewe/WebApp.git
    
Install modules

    cd WebApp
    npm install
    
Setup settings by copying settings.json.example to settings.json and filling
and change the values.

Create the javascript bundle

    ./load.sh -w
    
