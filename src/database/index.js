require("dotenv").config();

const Knex = require("knex");

module.exports = Knex({
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  useNullAsDefault: true,
});
