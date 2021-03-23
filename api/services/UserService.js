exports.findUserById = async function (db, query, cb) {
	try {
		await db.collection("users").findOne(query, cb);
	} catch (e) {
		console.log(e);
	}
};

exports.createUser = async function (db, user, cb) {
	try {
		db.collection("users").insertOne(user, cb);
	} catch (e) {
		console.log(e);
	}
};
