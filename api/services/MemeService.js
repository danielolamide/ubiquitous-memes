exports.createMeme = async function (db, query, meme, ) {
	try {
		const result = await db
			.collection("users")
			.updateOne(query, { $push: { bank: meme } });
		return result;
	} catch (e) {
		console.log(e);
	}
};

exports.getAll = async function (db, user) {
	try {
		const result = await db
			.collection("users")
			.find({ "google.sub": user }, { projection: { bank: 1 } });
		return result.toArray();
	} catch (e) {
		console.log(e);
	}
};

exports.findMeme = async function (db, query, user) {
	try {
		const result = await db
			.collection("users")
			.find(
				{ "google.sub": user, $text: { $search: query } },
				{ sort: { score: { $meta: "textScore" } }, projection: { bank: 1 } }
			);
		return result.toArray();
	} catch (e) {
		console.log(e);
	}
};
