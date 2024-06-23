const router = require('express').Router();
const User = require('../services/user.processor');
const controller = new User;

router.post('/progress', (req, res, next) => {
    try {
        const update = controller.update({
            email_: req.user.email,
            progress: req.body
        });

        res.status(200).json(update);
    }
    catch(err) {
        err.status = 401;
        next(err)
    }
});

router.post('/reset-progress', (req, res, next) => {
    try {
        const update = controller.update({
            email_: req.user.email,
            progress: {  
                name: req.body.name,
                page: "1"
            }
        });

        res.status(200).json(update);
    }
    catch(err) {
        err.status = 401;
        next(err)
    }
});

module.exports = router;