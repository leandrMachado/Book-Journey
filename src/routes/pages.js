const router = require('express').Router();
const fs = require('fs');
const path = require('path');

module.exports = (app) => {

    router.get('/game', (req, res, next) => {

        res.status(200).render('pages/game', { title: 'The Ruins of the Treasure Temple' })
    })

    return router
}