const router = require('express').Router();

router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) 
        return res.status(200).redirect("/pages/dashboard");

    res.status(200).render('access')
});

router.get('/dashboard', (req, res, next) => {
    if (!req.isAuthenticated()) 
        return res.status(401).redirect('/pages');

    res.status(200).render('dashboard', { username: req.user.username, hasSaveGame: false })
});

router.get('/playground', (req, res, next) => {
    res.status(200).render('playground');
})

module.exports = router;