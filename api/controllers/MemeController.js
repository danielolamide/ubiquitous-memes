exports.get = async function (req, res, next) {
	try {
		return res.status(200).json({ message: "Controller working" });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};
