exports.findUserById = async function (db, query, cb) {
	try {
		await db
			.collection("users")
			.findOne(query, { projection: { bank: 0 } }, cb);
	} catch (e) {
		console.log(e);
	}
};

exports.createUser = async function (db, user, cb) {
	try {
		await db.collection("users").insertOne(user, cb);
		await db.collection("users").createIndex({ "bank.tags": "text" });
	} catch (e) {
		console.log(e);
	}
};
