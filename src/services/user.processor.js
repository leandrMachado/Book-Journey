require("dotenv").config();
const PostgresConnection = require("./postgres.processor");

class User {
  constructor() {
    this.connection = new PostgresConnection(process.env.DB_ENVIRONMENT);
  }

  get = ({ email_ }) => {
    return new Promise(async (resolve, reject) => {
      await this.connection.searchByTerm("users", { email: email_ })
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

  #save_progress = async (progress, email) => {
    try {
      return await this.connection.searchByTerm("users", { email }).then(async user => {
        const user_progress = [ ...user.user_progress ].map(progress_ => JSON.parse(progress_));
        const progress_index = user_progress.findIndex(book => book.name === progress.name);

        if (progress_index !== -1) {
          user_progress[progress_index].page = progress.page;
        }
        else {
          user_progress.push({
            name: progress.name,
            page: progress.page
          })
        }

        return user_progress;
      })
    }
    catch (err) {
      throw new Error(err);
    }
  }

  update = ({ email_, progress }) => {
    return new Promise(async (resolve, reject) => {
      const user_progress = await  this.#save_progress(progress, email_);

      await this.connection.update("users", 
        {
          email: email_
        }, 
        {
          user_progress: user_progress
        }
      )
      .then(async (process_) => resolve(process_))
      .catch(err => { reject(err) })
    })
  };

  remove = () => {};
}

module.exports = User;
