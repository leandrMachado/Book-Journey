require("dotenv").config();

module.exports = {
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    debug: false,
    migrations: {
      directory: "src/migrations",
    },
    seeds: {
      directory: "src/seeds",
    },
    pool: {
      min: 0,
      max: 50,
      propagateCreateError: false,
    },
  },
};