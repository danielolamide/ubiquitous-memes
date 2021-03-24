require("dotenv").config();
const router = require("express").Router();
const MemeController = require("../controllers/MemeController");
var image = require("../config/ImageUpload");
var cloudinary = require("../config/cloudinary");
var MemeService = require("../services/MemeService");
var getDB = require("../config/database").db;
var imageMulter = image.multer;
var imageURI = image.dUri;

router.get("/", MemeController.get);

router.post("/", imageMulter, function (req, res) {
	const tags = req.body.tags.split(",");
	meme = { tags, url: "https" };
	MemeService.createMeme(
		getDB(),
		{ "google.sub": req.user.google.sub },
		meme,
		function (err, result) {
			if (err) console.log(err);
			return res.status(200).send(result);
		}
	);
	//if (req.file) {
	//const file = imageURI(req).content;
	//return cloudinary.uploader
	//.upload(file, { folder: `${process.env.CLOUDINARY_FOLDER}` })
	//.then((result) => {
	////res.status(200).json({ image: result.url });
	//const url = result.url;
	//const meme = { tags, url };
	//})
	//.catch((err) => res.status(400).send(err));
	//}
});

module.exports = router;
