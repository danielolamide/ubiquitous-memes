require("dotenv").config();
const router = require("express").Router();
const MemeController = require("../controllers/MemeController");
var image = require("../config/ImageUpload");
var cloudinary = require("../config/cloudinary");
var MemeService = require("../services/MemeService");
var getDB = require("../config/database").db;
var imageMulter = image.multer;
var imageURI = image.dUri;
var multer = require("multer");
//var storage = multer.memoryStorage();
var upload = multer();

router.get("/", MemeController.get);

//router.post("/", upload.single("meme"), function (req, res) {
//if (req.file) {
//console.log(req.body);
//res.status(200).send({ tags: req.body.tags, file: req.file });
//} else {
//res.send("No file");
//}
//});

router.post("/", imageMulter, function (req, res) {
	console.log(req.file);
	if (req.file) {
		const file = imageURI(req).content;
		return cloudinary.uploader
			.upload(file, { folder: `${process.env.CLOUDINARY_FOLDER}` })
			.then(async (result) => {
				const tags = req.body.tags.split(",");
				const url = result.url;
				const meme = { tags, url };
				const memeRes = await MemeService.createMeme(
					getDB(),
					{ "google.sub": req.user.google.sub },
					meme
					//function (err, memRes) {
					//if (err) console.log(err);
					//return res.status(200).send(memRes);
					//}
				).catch((e) => console.log(e));
				if (!memeRes) return;
				res.status(200).send(memeRes);
			})
			.catch((err) => res.status(400).send(err));
	}
});

router.get("/search/:q", MemeController.search);

module.exports = router;
