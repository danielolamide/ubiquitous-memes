var getDB = require("../config/database").db;
var MemeService = require("../services/MemeService");
exports.get = async function (req, res, next) {
	try {
		return res.status(200).json({ message: "Controller working" });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.search = async function (req, res, next) {
	const memes = await MemeService.findMeme(
		getDB(),
		req.params.q,
		req.user.google.sub
	);
	console.log(memes);
	res.send({ data: memes });
};
