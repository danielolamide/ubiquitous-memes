const router = require("express").Router();
const MemeController = require("../controllers/MemeController");

router.get("/", MemeController.get);

module.exports = router;
