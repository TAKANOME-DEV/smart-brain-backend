const knex = require("knex");
const pg = require("pg");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

/**  
 ** Local connection :
 
 *? connection: {
 *?   host: "127.0.0.1",
 *?   user: "your_user_name",
 *?   password: "your_db_password",
 *?   database: "your_db_name",
 *? }
*/

module.exports = db;
