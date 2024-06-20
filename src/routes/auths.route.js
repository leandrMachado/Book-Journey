const router = require('express').Router();
const GooglePassport = require('../controllers/passport.controller');

module.exports = (app) => {
    const passport = new GooglePassport({ application: app });

    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/google/handler', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.status(200).redirect('/dashboard');
    });

    router.get('/google/logout', (req, res, next) => {
        req.logout(err => {
            if (err) return next(err);

            res.status(200).redirect("/");
        })
    })

    return router;
};