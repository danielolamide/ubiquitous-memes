exports.createMeme = async function (db, query, meme, cb) {
	try {
		await db.collection("users").updateOne(query, { $push: { bank: meme } }, cb);
	} catch (e) {
		console.log(e);
	}
};
