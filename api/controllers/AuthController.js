exports.get = async function (req, res, next) {
	try {
		return res.status(200).send({ user: req.user });
	} catch (e) {
		res.status(400).send(e.message);
	}
};

exports.login = function (req, res, next) {
	res.status(200).send("Login Controller");
};

exports.logout = function (req, res, next) {
	req.logout();
	res.redirect("/auth/google");
};
