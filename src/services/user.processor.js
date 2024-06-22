require("dotenv").config();
const PostgresConnection = require("./postgres.processor");

class User {
  constructor() {
    this.connection = new PostgresConnection(process.env.DB_ENVIRONMENT);
  }

  get = ({ user_ }) => {
    return new Promise(async (resolve, reject) => {
      await this.connection.searchByTerm("users", { email: user_.emails[0].value })
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  };

  insert = ({ user_ }) => {
    return new Promise(async (resolve, reject) => {
      await this.connection.insert("users", {
        email: user_.emails[0].value,
        username: user_.name.givenName
      })
      .then(async (user) => resolve(user))
      .catch(err => reject(err))
    });
  };

  update = () => {};

  remove = () => {};
}

module.exports = User;
