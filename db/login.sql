DROP TABLE IF EXISTS login;

CREATE TABLE login (
  id serial PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  hash varchar(255)
);