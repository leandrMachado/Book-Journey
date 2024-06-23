require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../services/user.processor');

class GooglePassport {
    constructor ({ application }) {
        this.app = application;
        this.user = new User();

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL
            },
            async (token, token_secret, profile, done) => {
                this.user.get({ email_: profile.emails[0].value }).then(user_ => {
                    if (user_) { return done(null, user_) }
                    else {
                        this.user.insert({ user_: profile }).then(response_user => {
                            return done(null, response_user[0])
                        })
                        .catch(err => done(err, false))
                    }
                })
                .catch(err => { done(err, false) })
            }
        ));

        passport.serializeUser((user, done) => done(null, user));

        passport.deserializeUser((user, done) => done(null, user));
    }

    authenticate(provider, options) {
        return passport.authenticate(provider, options);
    }
}

module.exports = GooglePassport;