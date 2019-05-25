CREATE DATABASE {sql_database_name};
CREATE USER {sql_username} WITH ENCRYPTED PASSWORD '{sql_user_pass}';
\c {sql_database_name};
CREATE TABLE users(
user_id serial PRIMARY KEY,
username VARCHAR (50) UNIQUE NOT NULL,
password VARCHAR (500) NOT NULL,
email VARCHAR (500) NOT NULL,
user_type INT NOT NULL,
created_on TIMESTAMP NOT NULL,
last_login TIMESTAMP NOT NULL);
CREATE TABLE articles(
article_id serial PRIMARY KEY,
article_page VARCHAR(50),
title VARCHAR(500) NOT NULL,
author VARCHAR(500),
published BOOLEAN,
keywords VARCHAR(500),
created_on TIMESTAMP NOT NULL,
thumb_img VARCHAR(500),
description VARCHAR,
text VARCHAR);

GRANT ALL PRIVILEGES ON users, articles to {sql_username};

