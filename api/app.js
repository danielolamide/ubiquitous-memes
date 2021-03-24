require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connection = require("./config/database");
var passport = require("./config/passport");
var session = require("express-session");
var bodyParser = require("body-parser");
const memesRouter = require("./routes/meme.routes");
const authRouter = require("./routes/auth.routes");

connection.connect(function (err, client) {
	if (err) console.log(err);
	app.listen(port, () => {
		console.log("Server and Database Initialised");
	});
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use("/memes", memesRouter);
	app.use("/auth", authRouter);
});
