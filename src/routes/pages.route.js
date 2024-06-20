const router = require('express').Router();

router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) 
        return res.redirect("/dashboard");

    res.status(200).render('access', { title: 'DailyQuiz' })
});

router.get('/game', (req, res, next) => {
    if (!req.isAuthenticated()) 
        return res.status(401).redirect('/');

    res.status(200).redirect('/game/:id');
})

router.get('/game/:id', (req, res, next) => {
    if (!req.isAuthenticated())
        return res.redirect("/");

    res.status(200).render('game', { ananas: "asadas" });
});

module.exports = router;