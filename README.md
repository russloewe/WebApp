# WebApp
Basic Web Application using Nodejs, Express, Passport, Postrgesql, Webpack, React, and Redux.
Testing with Mocha and Chai.

## Sever Setup

First install and set up a postgre server. Create user role and database
www and add table for users and articles:

    CREATE DATABASE yourdbname;
    CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
    GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;

    CREATE TABLE account(
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    passsalt VARCHAR (20) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    user_type INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
    );

    CREATE TABLE articles(
    title VARCHAR(500) NOT NULL;
    created_on TIMESTAMP NOT NULL,
    last_edit TIMESTAMP,
    text VARCHAR,
    keywords VARCHAR(500),
    author VARCHAR(500),
    article_id serial PRIMARY KEY);
    
    GRANT ALL PRIVILEGES ON TABLE article TO www;
    GRANT ALL PRIVILEGES ON TABLE articles_serial_seq TO www;
    
    //add automatic timestamp for editing articles
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.last_edit = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

Next install nvm see https://github.com/creationix/nvm 

Install node

	nvm install node
	

### Setup on GCP Ubuntu VM

First setup firewall to allow port 80 traffic

    sudo iptables -A OUTPUT -p tcp --sport 80 -m conntrack --ctstate ESTABLISHED -j ACCEPT
    sudo iptables -A INPUT -p tcp --dport 80 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
    
Second, set up internal routing so port 80 traffic is routed to port 3000. This way
we don't need to run npm as root.

	sudo iptables -t nat -A PREROUTING -i eth0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 3000
    
login to postgres server 

	sudo -u postgres psql www


## WebApp Setup

Get source.

    git clone https://github.com/russloewe/WebApp.git
    
Install modules

    cd WebApp
    npm install
    
Setup settings by copying settings.json.example to settings.json and filling
and change the values.

Run the server tests

    npm run test

Create the javascript bundle

    ./load.sh -w

set to production

   export NODE_ENV=production
   
Start the server

    npm start
    
## Customize


Change CSS for desktop

    /public/stylsheets/styl.css
    
Chang CSS for mobile

    /public/stylsheets/styl_mobil.css
