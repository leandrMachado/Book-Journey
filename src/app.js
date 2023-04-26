const express = require('express');
const app = express();
const consign = require('consign');
const cors = require('cors');
const path = require('path');

app.use(cors({

}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')))

consign({ cwd: 'src', verbose: false })
    .include('./config/middlewares.js')
    .include('./routes')
    .include('./config/router.js')
    .into(app);

app.get('/', (req, res, next) => {
    res.status(200).redirect('/game');
})

app.use((req, res, next) => {
    const err = {};
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const { name, message, stack } = err;

    if (err.status === 404) {
        return res.status(404).json({ message: 'Page not found!'})
    }

    res.status(500).json({ name, message, stack })
})

module.exports = app;