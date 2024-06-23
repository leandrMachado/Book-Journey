class HistoryController {
    constructor() {
        const params = {};
        const queryString = document.currentScript.src.split('?')[1];

        if (queryString) {
            const pairs = queryString.split('&');

            for (const pair of pairs) {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            }
        }

        this.params = params;
    };

    history_() {
        return fetch(`/Historys/${this.params.history}.json`)
        .then(response => response.json())
        .then(history => {
            return history;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
    };

    saveHistory_(page) {
        return new Promise(async (resolve, reject) => {
            await fetch('/utilitys/users/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.params.history, page: page })
            })
            .then(response => { response.json() })
            .then(result => { resolve(result) })
            .catch(error => reject(error));
        })
    };

};



const historyController = new HistoryController();