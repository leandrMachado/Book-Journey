const fs = require('fs');
const path = require('path');

class Historys {

    static #formateHistoryName = (history_) => {
        return history_
            .replace(/\.json$/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase())
    }

    static listHistorys = (callback) => {
        const historys_ = [];

        fs.readdir(path.join(__dirname, '../public/Historys'), (err, files) => {
            if (err) return callback(err);

            files.forEach((file_name) => {
                historys_.push({
                    name: this.#formateHistoryName(file_name),
                    slug: file_name.replace(/\.json$/, "")
                });
            })

            callback(null, historys_);
        })
    }

}

module.exports = Historys;