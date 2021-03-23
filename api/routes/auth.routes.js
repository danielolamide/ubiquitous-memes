const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const passport = require("../config/passport");

router.get("/", AuthController.get);
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["https://www.googleapis.com/auth/plus.login"],
	})
);
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	function (req, res) {
		res.redirect("/auth");
	}
);
router.get("/login", AuthController.login);
router.get("/logout", AuthController.logout);

module.exports = router;
