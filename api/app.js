require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connection = require("./config/database");
const redis = require("redis");
var passport = require("./config/passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
const memesRouter = require("./routes/meme.routes");
const authRouter = require("./routes/auth.routes");
const RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

connection.connect(function (err, client) {
	if (err) console.log(err);
	app.listen(port, () => {
		console.log("Server and Database Initialised");
	});
	app.use(
		session({
			//store: new RedisStore({ client: redisClient }),
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
		})
	);
	app.use(cors({ origin: "http://localhost:3000", credentials: true }));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use("/memes", memesRouter);
	app.use("/auth", authRouter);
});
