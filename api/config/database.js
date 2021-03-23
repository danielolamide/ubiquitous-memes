require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.DB_URL;
const db = process.env.DB_NAME;

var _db;

module.exports = {
	connect: function (callback) {
		MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
			_db = client.db(db);
			return callback(err);
		});
	},
	db: function () {
		return _db;
	},
};
