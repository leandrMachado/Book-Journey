require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

app.use(require("body-parser").json());

app.use(
  require("cors")({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
    require('express-session')({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')))

app.use('/auths', require('./routes/auths.route')(app));
app.use('/pages', require('./routes/pages.route'));

app.get('/', (req, res, next) => {
    res.status(200).redirect('/pages');
})


app.use((req, res, next) => {
    const err = {};
    err.status = 404;
    err.message = "Page not found";
    next(err);
});

app.use((err, req, res, next) => {
    const { name, message, stack } = err;
    if (err.status === 404) res.status(404).json(message);
});

module.exports = app;
