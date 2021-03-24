var multer = require("multer");
var dataURI = require("datauri/parser");
var path = require("path");
const storage = multer.memoryStorage();

exports.multer = multer({ storage }).single("meme");
exports.dUri = (req) =>
	new dataURI().format(
		path.extname(req.file.originalname).toString(),
		req.file.buffer
	);
