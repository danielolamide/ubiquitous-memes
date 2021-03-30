var getDB = require("../config/database").db;
var MemeService = require("../services/MemeService");

exports.get = async function (req, res, next) {
	const memes = await MemeService.getAll(getDB(), req.user.google.sub);
	res.status(200).send(memes);
};

exports.search = async function (req, res, next) {
	const memes = await MemeService.findMeme(
		getDB(),
		req.params.q,
		req.user.google.sub
	);
	res.status(200).send(memes);
};
