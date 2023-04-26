const express = require('express');

module.exports = (app) => {
    app.use('/', app.routes.pages);
}