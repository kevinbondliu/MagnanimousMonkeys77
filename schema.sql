DROP DATABASE IF EXISTS thumbscheck;

CREATE DATABASE IF NOT EXISTS thumbscheck;

USE thumbscheck;

DROP TABLE if exists users;
DROP TABLE if exists thumbs;
DROP TABLE if exists questions;
DROP TABLE if exists lectures;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30)  NOT NULL,
  last_name VARCHAR(30)  NOT NULL,
  gmail VARCHAR(30) NOT NULL,
  user_type ENUM("STUDENT", "INSTRUCTOR") NOT NULL,
  PRIMARY KEY (ID)
);


CREATE TABLE lectures (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  average_thumb_lecture DEC(4,2),
  PRIMARY KEY (ID)
);

CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  lecture_id INT NOT NULL,
  average_thumb_question DEC(4,2),
  A INT,
  B INT,
  C INT,
  D INT,
  E INT,
  PRIMARY KEY (ID)
);

CREATE TABLE thumbs (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  thumb_value INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

CREATE TABLE choice (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer VARCHAR(1) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

/*
 *
 */

INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Rob", "St. Lezin", "robstlezin@gmail.com", "STUDENT");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Shyan", "Kashani", "shyan.kashani@gmail.com", "STUDENT");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Mike", "Clausen", "michaeljclausen@gmail.com", "INSTRUCTOR");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Chris", "Aaker", "caaker.0@gmail.com", "STUDENT");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Robs", "Rent", "Stlezinrent@gmail.com", "INSTRUCTOR");

INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Julia", "Wong", "juliawong05@gmail.com", "INSTRUCTOR");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Shyan", "Instructor", "shyankashani1@gmail.com", "INSTRUCTOR");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Jey", "Reyes", "jesselowellreyes@gmail.com", "INSTRUCTOR");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Jesse", "Reyes", "jesselowellreyes1@gmail.com", "INSTRUCTOR");
INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("Kevin", "Liu", "kevinbondliu@gmail.com", "INSTRUCTOR");


/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.
 */

 /*
  *  Thumb values will be quantified between 1 and 5
  *  and averages will hold values between 1 and 5 as well
  *
  */


/*
 *
 * CLEARDB_DATABASE_URL
 * mysql://be6789ba34707e:02c8f71e@us-cdbr-iron-east-03.cleardb.net/heroku_57eb1e9aa24d7a7?reconnect=true
 */
