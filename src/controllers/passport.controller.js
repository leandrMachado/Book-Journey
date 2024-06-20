require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class GooglePassport {
    constructor ({ application }) {
        this.app = application;

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'http://localhost:8000/authenticated/google/handler'
            },
            async (token, token_secret, profile, done) => {
                return done(null, profile);
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