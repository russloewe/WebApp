CREATE DATABASE {sql_database_name};
CREATE USER {sql_username} WITH ENCRYPTED PASSWORD '{sql_user_pass}';
\c {sql_database_name};

CREATE TABLE siteinfo(
var VARCHAR UNIQUE,
val VARCHAR
);

INSERT INTO siteinfo (var, val) VALUES ('sitename', 'russloewe.com');
INSERT INTO siteinfo (var, val) VALUES ('url', 'russloewe.com');
INSERT INTO siteinfo (var, val) VALUES ('topics', 'About,Resume,Examples')

CREATE TABLE users(
id serial PRIMARY KEY,
name VARCHAR (50) UNIQUE NOT NULL,
passwd VARCHAR (500) NOT NULL,
email VARCHAR (500) NOT NULL);

CREATE TABLE pages(
id serial PRIMARY KEY,
topic VARCHAR(50),
title VARCHAR(500) NOT NULL,
public BOOLEAN,
created TIMESTAMP NOT NULL,
img VARCHAR(500),
description VARCHAR,
body VARCHAR);

GRANT ALL PRIVILEGES ON users, pages to {sql_username};

