require("dotenv").config();
const router = require("express").Router();
const MemeController = require("../controllers/MemeController");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var image = require("../config/ImageUpload");
var cloudinary = require("../config/cloudinary");
var MemeService = require("../services/MemeService");
var getDB = require("../config/database").db;
var imageMulter = image.multer;
var imageURI = image.dUri;

router.get("/", MemeController.get);

router.post("/", imageMulter, function (req, res) {
	//ensureLoggedIn('/auth/login');
	if (req.file) {
		const file = imageURI(req).content;
		return cloudinary.uploader
			.upload(file, { folder: `${process.env.CLOUDINARY_FOLDER}` })
			.then((result) => {
				const tags = req.body.tags.split(",");
				const url = result.url;
				const meme = { tags, url };
				MemeService.createMeme(
					getDB(),
					{ "google.sub": req.user.google.sub },
					meme,
					function (err, memRes) {
						if (err) console.log(err);
						return res.status(200).send(memRes);
					}
				);
			})
			.catch((err) => res.status(400).send(err));
	}
});

router.get("/search/:q", MemeController.search);

module.exports = router;
