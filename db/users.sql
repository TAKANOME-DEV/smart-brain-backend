DROP TABLE IF EXISTS users;

CREATE TABLE users (
   id serial PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  entries BIGINT DEFAULT 0,
  joined TIMESTAMP
);