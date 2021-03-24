require("dotenv").config();
const UserService = require("../services/UserService");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const connection = require("../config/database");
var getDB = connection.db;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, cb) {
			UserService.findUserById(
				getDB(),
				{ "google.sub": profile.id },
				function (err, result) {
					if (err) {
						return cb(err);
					}
					if (result == null) {
						var user = {
							name: profile.displayName,
							email: profile.emails[0].value,
							photos: profile.photos[0].value,
							provider: "google",
							google: profile._json,
							bank: [],
						};
						UserService.createUser(getDB(), user, function (error, res) {
							if (error) console.log(error);
							return cb(err, user);
						});
					} else {
						return cb(err, result);
					}
				}
			);
		}
	)
);
passport.serializeUser(function (user, cb) {
	cb(null, user.google.sub);
});

passport.deserializeUser(function (id, cb) {
	UserService.findUserById(
		getDB(),
		{ "google.sub": id },
		function (err, result) {
			if (err) console.log(result);
			cb(err, result);
		}
	);
});

module.exports = passport;
